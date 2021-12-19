const { Payment, Party, OTT, User, Statement } = require("../models");
const { generateImportToken, checkAccountName } = require("./importFunction/account");
const { createSubscription, createSchedule } = require("./importFunction/subscription");
const dayjs = require("dayjs");
const date = dayjs().format("YYYY-MM-DD");
const sequelize = require("sequelize");
const user = require("./user");
const party = require("./party");
const { patch } = require("../router/auth");
const Op = sequelize.Op;

module.exports = {
  getUsersPaymentInfo: async (req, res) => {
    const user_id = req.userId;

    // 파티 시작일보다 정산일이 빠른 경우, 다음달로 정기 결제 요청하기 위해 월 변경 함수
    const checkDate = (settlement_date) => {
      let date = "";
      if (Number(settlement_date) < Number(dayjs().date())) {
        date =
          new Date(
            `${dayjs().year()}-${dayjs().add(1, "month").month() + 1}-${settlement_date}T01:03:00`
          ) / 1000;
      } else {
        date =
          new Date(`${dayjs().year()}-${dayjs().month() + 1}-${settlement_date}T01:03:00`) / 1000;
      }
      return date;
    };

    // 포도머니 사용 관련 시나리오
    // 1. 포도머니 우선 사용하고 결제 금액보다 많으면 자동 결제 요청을 하지 않는다
    // 2 .데이타 베이스에서 사용 포인트를 제외한 남은 포인트로 업데이트 해준다
    // 3. 문제는 다음 결제를 어떻게 예약 하는가이다...

    // 결제 가격 계산과 포도머니 우선 결제 함수
    const calculatePointMoney = (userId, totalPrice, members, pointMoney, usePoint) => {
      let result = "";
      if (pointMoney >= Math.ceil(totalPrice / members / 10) * 10 && usePoint) {
        const reminds = pointMoney - Math.ceil(totalPrice / members / 10) * 10;
        // 결제에 필요한 금액을 뺸 나머지를 업데이트 해줌
        User.update(
          {
            money: reminds,
          },
          {
            where: { id: userId },
          }
        );
        result = Math.ceil(totalPrice / members / 10) * 10 * -1;
      } else {
        result = Math.ceil(totalPrice / members / 10) * 10;
      }
      return result;
    };

    // 아임포트가 요구하는 결제에 필요한 데이터를 요구 형태로 만들어주는 함수
    const makeDataSet = (
      userId,
      customerId,
      settlementDate,
      totalPrice,
      members,
      point,
      ottName,
      usePoint
    ) => {
      return {
        user_id: userId,
        customer_uid: customerId,
        checking_amount: "10",
        schedules: [
          {
            merchant_uid: `merchant_${dayjs().valueOf()}${userId}`,
            schedule_at: checkDate(settlementDate),
            currency: "KRW",
            amount: calculatePointMoney(userId, totalPrice, members, point, usePoint),
            name: ottName,
          },
        ],
      };
    };

    // 아임포트에 결제 예약 요청 후 결제 내역 데이타 베이스에 저장하는 함수
    const requestPayment = (data = {}) => {
      // 결제 금액이 포도 머니로 대체 결제 되었다면 결제 예약 진행하지 않는다.
      if (data.schedules[0].amount > 0) {
        generateImportToken() // 아임포트 토큰 발행
          .then((token) => createSchedule(data, token)) // 정기 결제 요청
          .then((result) => {
            // 전달 데이터에 문제가 있는 경우
            if (result.data.code === -1) {
              console.log(result.data.message);
              return res.status(422).json({ message: result.data.message });
            }
            // console.log(result.data.response, "payment info2"); //결제 정보
            Statement.create({
              user_id: data.user_id,
              merchant_uid: data.schedules[0].merchant_uid,
              ott: data.schedules[0].name,
              type: "pending",
              amount: data.schedules[0].amount,
            });
          });
      } else {
        Statement.create({
          user_id: data.user_id,
          merchant_uid: data.schedules[0].merchant_uid,
          ott: data.schedules[0].name,
          type: "usePoint",
          amount: data.schedules[0].amount * -1,
        });
      }
    };

    try {
      const paymentInfos = await Party.findAll({
        include: [
          {
            model: OTT,
            attributes: ["name", "price"],
          },
        ],
        where: { start_date: { [Op.eq]: "2021-12-17" } },
        raw: true,
      });
      // console.log(paymentInfos);
      // 오늘 날짜에 시작하는 파티가 없는 경우,
      if (paymentInfos.length < 1) {
        return res.status(422).json({ message: "No today's party" });
      }

      // 결제에 필요한 데이터
      // 1. 맴버 총 수(가격을 N등분 하기 위해) => user_id.lenght;
      // 2. 리더를 제외한 맴버들의 customer_uid => user_id를 사용 검색
      // 3. 결제하고자 하는 ott 이름과 가격 => ott_id

      //멤버 2명이상인 파티만  -> 배열이니 map 사용
      const fulfilledParty = paymentInfos.map((party) => {
        if (party.members.length > 2) {
          const payList = {
            party_id: party.id,
            ott_id: party.ott_id,
            userIdList: party.members.slice(2).split(","),
            divide: party.members.slice(2).split(",").length + 1,
            ott_name: party["OTT.name"],
            ott_price: party["OTT.price"],
          };

          return payList;
        }
      });

      // 오늘 날짜에 시작하는 파티는 있지만 맴버가 2명 이상이 아닌 경우,
      if (fulfilledParty.length < 1) {
        return res.status(422).json({ message: "Party members aren't enough" });
      }

      // 아임포트 결제에 맞게 데이터 정리 후 정기 결제 요청 과정
      // 1. 맴버들의 아이디로 각 맴버의 payment데이터를 뽑아온다.
      // 2. 가져온 데이터를 조합해서 아임포트에 전달하는 데이터 양식에 맞게 정리해서 사용 가능하게 만든다.
      // 3. 정기 결제 요청을 subscritpion을 통해 한다.
      // 4. 데이타 베이스(statement)에 결제 요청 내역을 pending으로 만든다.
      // 5. 실제 정산일에 결제가 되면 아임포트로부터 웹훅을 통해 결제 내역이 전달된다.
      // 6. 실 결제 내역과 데이타베이스에 저장된 내역과 비교해서 결제에 문제가 없는지 확인한다
      // 7. 다시 다음달 예약 결제를 요청한다.

      // 1. 맴버들의 아이디로 각 맴버의 payment데이터를 뽑아온다.
      for (let i = 0; i < fulfilledParty.length; i++) {
        if (fulfilledParty[i] !== undefined) {
          User.findAll({
            include: [
              {
                model: Payment,
                attributes: ["settlement_date", "user_id", "customer_uid", "use_podo"],
              },
            ],
            where: { id: fulfilledParty[i].userIdList },
            attributes: ["money"],
            raw: true,
          })
            .then((data) => {
              fulfilledParty[i]["userPayInfo"] = data;

              // 2. 가져온 데이터를 조합해서 아임포트에 전달하는 데이터 양식에 맞게 정리해서 사용 가능하게 만든다.
              const userPaymentInfo = [];

              if (fulfilledParty[i].userPayInfo.length > 1) {
                for (let uid of fulfilledParty[i].userPayInfo) {
                  userPaymentInfo.push(
                    makeDataSet(
                      uid["Payments.user_id"],
                      uid["Payments.customer_uid"],
                      uid["Payments.settlement_date"],
                      fulfilledParty[i].ott_price,
                      fulfilledParty[i].divide,
                      uid.money,
                      fulfilledParty[i].ott_name,
                      uid["Payments.use_podo"]
                    )
                  );
                }
              } else {
                const uid = fulfilledParty[i].userPayInfo[0];
                userPaymentInfo.push(
                  makeDataSet(
                    uid["Payments.user_id"],
                    uid["Payments.customer_uid"],
                    uid["Payments.settlement_date"],
                    fulfilledParty[i].ott_price,
                    fulfilledParty[i].divide,
                    uid.money,
                    fulfilledParty[i].ott_name,
                    uid["Payments.use_podo"]
                  )
                );
              }

              // console.log(userPaymentInfo[0].schedules);
              return userPaymentInfo;
            })
            .then((data) => {
              // 3. 정기 결제 요청을 subscritpion을 통해 한다.
              if (data.length > 1) {
                for (let userInfo of data) {
                  requestPayment(userInfo);
                }
              } else {
                const userInfo = data[0];
                requestPayment(userInfo);
              }
            });
        }
      }

      const paymentInfo = await Payment.findAll({
        where: { user_id },
        raw: true,
      });

      if (paymentInfo) {
        return res.status(200).json({ data: paymentInfo });
      }
      return res.status(404).json({ message: "Failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  updateCard: async (req, res) => {
    const user_id = req.userId;
    const {
      credit_num,
      credit_expire_month,
      credit_expire_year,
      credit_birth,
      credit_password,
      settlement_date,
      account_bank,
      account_number,
    } = req.body;

    const data = {
      customer_uid: `customer_` + dayjs().valueOf() + `${user_id}`,
      card_number: credit_num,
      expiry: `20${credit_expire_year}-${credit_expire_month}`,
      birth: credit_birth,
      pwd_2digit: credit_password,
    };

    generateImportToken() // 아임포트 토큰 발행
      .then((token) => createSubscription(data, token)) // 빌링키 생성
      .then((result) => {
        // 카드정보 오류인 경우
        if (result.data.code === -1) {
          console.log(result.data.message);
          return res.status(422).json({ message: result.data.message });
        }
        try {
          // console.log(result.data.response.card_name); //카드 정보
          // 아임포트로부터 빌링키 생성 후 받은 카드 정보를 우리 디비에 저장
          Payment.findOne({
            where: { user_id },
            raw: true,
          }).then((paymentInfo) => {
            // console.log(paymentInfo);

            //등록한 적이 없다면 create
            if (!paymentInfo) {
              Payment.create({
                user_id,
                credit_num: result.data.response.card_number,
                customer_uid: result.data.response.customer_uid,
                card_name: result.data.response.card_name,
                settlement_date,
                account_bank,
                account_number,
              });
            } else {
              //등록한 적이 있다면 update
              // console.log("update card info");
              Payment.update(
                {
                  credit_num: result.data.response.card_number,
                  customer_uid: result.data.response.customer_uid,
                  card_name: result.data.response.card_name,
                },
                { where: { user_id } }
              );
            }

            return res.status(200).json({ data: result.data.response });
          });
        } catch (error) {
          return res.status(500).json({ message: "Server Error" });
        }
      });
  },

  updateAccount: async (req, res) => {
    const user_id = req.userId;

    const {
      credit_num,
      credit_expire_month,
      credit_expire_year,
      credit_birth,
      credit_password,
      settlement_date,
      account_bank,
      account_number,
    } = req.body;
    console.log(account_bank, account_number);

    generateImportToken() // 아임포트 토큰 발행
      .then((token) => checkAccountName(account_bank, account_number, token)) // 예금주 실명 조회
      .then((data) => {
        console.log(data); //예금주 실명
        try {
          Payment.findOne({
            where: { user_id },
            raw: true,
          }).then((paymentInfo) => {
            console.log(paymentInfo);
            if (user_id && account_bank && account_number) {
              //등록한 적이 없다면 create
              if (!paymentInfo) {
                Payment.create({
                  user_id,
                  credit_num,
                  customer_uid: null,
                  card_name: null,
                  settlement_date,
                  account_bank,
                  account_number,
                });
              } else {
                //등록한 적이 있다면 update
                Payment.update({ account_bank, account_number }, { where: { user_id } });
              }
            }
            return res.status(200).json({ data });
          });
        } catch (error) {
          return res.status(500).json({ message: "Server Error" });
        }
      });
  },

  updateSettlement: async (req, res) => {
    const user_id = req.userId;
    const { credit_num, customer_uid, cardname, settlement_date, account_bank, account_number } =
      req.body;

    try {
      Payment.findOne({
        where: { user_id },
        raw: true,
      }).then((paymentInfo) => {
        //정산일 등록에 필요한 정보 모두 있다면 DB에 관련 정보 등록
        if (user_id && settlement_date) {
          if (!paymentInfo) {
            Payment.create({
              user_id,
              customer_uid,
              credit_num,
              cardname,
              settlement_date,
              account_bank,
              account_number,
            });
          }
          Payment.update({ settlement_date }, { where: { user_id } });
        }
      });
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
