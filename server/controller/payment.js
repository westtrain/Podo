const { Payment } = require("../models");
const dayjs = require("dayjs");
const { generateImportToken, checkAccountName } = require("./importFunction/account");
const { createSubscription } = require("./importFunction/subscription");

module.exports = {
  getUsersPaymentInfo: async (req, res) => {
    const user_id = req.userId;
    try {
      const paymentInfo = await Payment.findAll({ where: { user_id }, raw: true });
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
    const { credit_num, credit_expire_month, credit_expire_year, credit_birth, credit_password } =
      req.body;
    const data = {
      customer_uid: `customer_` + dayjs().valueOf() + `${user_id}`,
      card_number: credit_num,
      expiry: `20${credit_expire_year}-${credit_expire_month}`,
      birth: credit_birth,
      pwd_2digit: credit_password,
    };

    await generateImportToken() // 아임포트 토큰 발행
      .then(async (token) => await createSubscription(data, token)) // 빌링키 생성
      .then((result) => {
        console.log(result);
        return res.status(422).json({ message: result });
        // 카드정보 오류인 경우
        // if (result.data.code === -1) {
        //   return res.status(422).json({ message: result.data.message });
        // }
        const { card_number, customer_uid, card_name } = result.data.response;

        try {
          // 아임포트로부터 빌링키 생성 후 받은 카드 정보를 우리 디비에 저장
          Payment.findOne({
            where: { user_id },
            raw: true,
          }).then((paymentInfo) => {
            //등록한 적이 없다면 create
            if (!paymentInfo) {
              Payment.create({ user_id, credit_num: card_number, customer_uid, card_name });
            } else {
              //등록한 적이 있다면 update
              Payment.update(
                { credit_num: card_number, customer_uid, card_name },
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
    const { account_bank, account_number } = req.body;

    generateImportToken() // 아임포트 토큰 발행
      .then((token) => checkAccountName(account_bank, account_number, token)) // 예금주 실명 조회
      .then((data) => {
        const account_holder = data.bank_holder;
        try {
          Payment.findOne({ where: { user_id }, raw: true }).then((paymentInfo) => {
            if (user_id && account_bank && account_number) {
              //등록한 적이 없다면 create
              if (!paymentInfo) {
                Payment.create({ user_id, account_bank, account_number, account_holder });
              } else {
                //등록한 적이 있다면 update
                Payment.update(
                  { account_bank, account_number, account_holder },
                  { where: { user_id } }
                );
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
    const { settlement_date } = req.body;

    try {
      Payment.findOne({ where: { user_id }, raw: true }).then((paymentInfo) => {
        //정산일 등록에 필요한 정보 모두 있다면 DB에 관련 정보 등록
        if (user_id && settlement_date) {
          if (!paymentInfo) {
            Payment.create({ user_id, settlement_date });
          }
          Payment.update({ settlement_date }, { where: { user_id } });
        }
      });
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  updateUsingPodo: async (req, res) => {
    const user_id = req.userId;
    const use_podo = req.params.id;

    try {
      Payment.update({ use_podo }, { where: { user_id } });

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
