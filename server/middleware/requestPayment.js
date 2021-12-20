const { Payment, Party, OTT, User } = require("../models");
const { usePoint } = require("../controller/paymentFunction/calculator");

const dayjs = require("dayjs");
const date = dayjs().format("YYYY-MM-DD");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const { makeDataSet, requestPayment } = require("../controller/paymentFunction/setPayment");

module.exports = {
  requestPaymentByStartDate: async () => {
    // 파티 시작일보다 정산일이 빠른 경우, 다음달로 정기 결제 요청하기 위해 월 변경 함수
    try {
      const paymentInfos = await Party.findAll({
        include: [
          {
            model: OTT,
            attributes: ["name", "price"],
          },
        ],
        where: { start_date: { [Op.eq]: date } },
        raw: true,
      });
      // console.log(paymentInfos);
      // 오늘 날짜에 시작하는 파티가 없는 경우,
      if (paymentInfos.length < 1) {
        console.log("No today's party");
        return -1;
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
        console.log("Party members aren't enough");
        return -1;
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
                  // 맴버수에 맞추어 가격은 나누어준다
                  const totalPrice = fulfilledParty[i].ott_price;
                  const members = fulfilledParty[i].divide;
                  const amount = Math.ceil(totalPrice / members / 10) * 10;
                  userPaymentInfo.push(
                    makeDataSet(
                      uid["Payments.user_id"],
                      uid["Payments.customer_uid"],
                      uid["Payments.settlement_date"],
                      fulfilledParty[i].ott_name,
                      amount
                    )
                  );
                }
              } else {
                const uid = fulfilledParty[i].userPayInfo[0];
                // 맴버수에 맞추어 가격은 나누어준다
                const totalPrice = fulfilledParty[i].ott_price;
                const members = fulfilledParty[i].divide;
                const amount = Math.ceil(totalPrice / members / 10) * 10;
                userPaymentInfo.push(
                  makeDataSet(
                    uid["Payments.user_id"],
                    uid["Payments.customer_uid"],
                    uid["Payments.settlement_date"],
                    fulfilledParty[i].ott_name,
                    amount
                  )
                );
              }
              // console.log(userPaymentInfo[0].schedules);
              return userPaymentInfo;
            })
            .then(async (data) => {
              // 3. 정기 결제 요청을 subscritpion을 통해 한다.
              if (data.length > 1) {
                for (let userInfo of data) {
                  await requestPayment(userInfo);
                }
              } else {
                const userInfo = data[0];
                await requestPayment(userInfo);
              }
            });
        }
      }
      console.log("Requested payment");
    } catch (err) {
      console.lof(err);
      return -1;
    }
  },

  usePointMoney: async () => {
    const todayDate = dayjs().date();
    try {
      // 1. 정산일이 오늘인 유저를 찾고 그 유저의 id, money, customer_uid, use_podo를 가져온다.
      await Payment.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "money"],
          },
        ],
        where: { settlement_date: { [Op.eq]: "29" } },
        attributes: ["customer_uid", "use_podo"],
        raw: true,
      }).then(async (data) => {
        // 포인트 선결제 허용한 유저만 필터링
        const removeUnusePointUser = data.map((user) => {
          if (user.use_podo === 1) {
            return user;
          }
        });
        const usePointUser = removeUnusePointUser.filter((item) => {
          return typeof item === "object";
        });

        // 에약되어 있는 결제 내역을 찾을 시간 범위 설정
        const searchData = {
          customer_uid: "",
          from: new Date(`${dayjs().year()}-${dayjs().month() + 1}-${todayDate}T01:00:00`) / 1000,
          to: new Date(`${dayjs().year()}-${dayjs().month() + 1}-${todayDate}T02:00:00`) / 1000,
          status: "scheduled",
        };
        // console.log(usePointUser);
        // return -1;
        if (usePointUser.length > 1) {
          for (let uid of usePointUser) {
            // console.log(uid);
            let point = uid["User.money"];
            const userId = uid["User.id"];

            searchData.customer_uid = uid.customer_uid;
            // 2. customer_uid로 아임포트에 예약 결제 내역을 요청하고 내역이 있으면 취소하고 포인트로 결제 진행
            await usePoint(userId, point, searchData);
          }
        } else {
          let point = usePointUser[0]["User.money"];
          const userId = usePointUser[0]["User.id"];
          searchData.customer_uid = usePointUser[0].customer_uid;
          // 2. customer_uid로 아임포트에 예약 결제 내역을 요청하고 내역이 있으면 취소하고 포인트로 결제 진행
          usePoint(userId, point, searchData);
        }
      });
    } catch (err) {
      console.log(err);
      return -1;
    }
    // 이 함수의 시나리오
    // 만약 포인트 머니가 오늘 결제 예정인 총금액보다 많거나 같고 먼저 사용하겠다고 설정한 상태이면,
    // 결제를 취소하고 포인트머니를 사용하게 해준다.
    // 그리고 다음달 결제를 요청한다
    // 조건에 맞지 않으면, 예약된 결제가 진행되도록 나둔다.

    // 필요한 데이타
    // 유저의 아이디 (id)
    // 새로운 결제 요청에 필요한 정보들 (customer_uid, Statement테이블의 모든 데이터)
    // 당일이 정산일인 유저의 포인트 머니 (momey)
    // 포인트 머니 우선 사용 설정 상태 (use_podo)
    // 각 유저의 오늘 결제 예정인 merchant_uid (merchant_uid, schedule_at)
    // 각 유저의 오늘 결제 예정인 총 금액 (amount)
  },
  // 추후 구현이 필요한 부분들
  // cancelPayment: async () => {},
};
