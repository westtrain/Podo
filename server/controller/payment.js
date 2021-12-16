const { Payment, Party, OTT } = require("../models");
const { generateImportToken, checkAccountName } = require("./importFunction/account");
const { createSubscription } = require("./importFunction/subscription");
const moment = require("moment");
const date = moment().format("YYYY-MM-DD");
const sequelize = require("sequelize");
const user = require("./user");
const Op = sequelize.Op;

module.exports = {
  getUsersPaymentInfo: async (req, res) => {
    const user_id = req.userId;
    try {
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
      customer_uid: `customer_` + Date.now() + `${user_id}`,
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
            console.log(paymentInfo);

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
              console.log("update card info");
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
