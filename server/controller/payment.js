const { Payment } = require("../models");
const { generateImportToken, checkAccountName } = require("./importFunction/account");

module.exports = {
  getUsersPaymentInfo: async (req, res) => {
    const user_id = req.userId;
    try {
      // 특정 유저에 해당하는 Payment 내역 조회
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

  changeCard: async (req, res) => {
    // req 변수 선언 할당
    const user_id = req.userId;
    const { credit_num, credit_expire_month, credit_expire_year, credit_birth, credit_password } =
      req.body;

    try {
      if (
        user_id &&
        credit_num &&
        credit_expire_month &&
        credit_expire_year &&
        credit_birth &&
        credit_password
      ) {
        //아임포트로 카드 확인
        await Payment.update(
          { credit_num, credit_expire_month, credit_expire_year, credit_birth, credit_password },
          { where: { user_id } }
        );
        return res.status(200).json({ message: "Success" });
      }
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  changeSettlement: async (req, res) => {
    const user_id = req.userId;
    const { settlement_date } = req.body;
    try {
      if (user_id && settlement_date) {
        // 아임포트로 정기결제일 변경
        await Payment.update({ settlement_date }, { where: { user_id } });
        return res.status(200).json({ message: "Success" });
      }
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollCard: async (req, res) => {
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

    try {
      const paymentInfo = await Payment.findOne({
        where: { user_id },
        raw: true,
      });
      //아임포트로 카드 확인
      //카드 등록에 필요한 정보 모두 있다면 DB에 관련 정보 등록
      if (
        user_id &&
        credit_num &&
        credit_expire_month &&
        credit_expire_year &&
        credit_birth &&
        credit_password
      ) {
        if (!paymentInfo) {
          await Payment.create({
            user_id,
            credit_num,
            credit_expire_month,
            credit_expire_year,
            credit_birth,
            credit_password,
            settlement_date,
            account_bank,
            account_number,
          });
        }
        await Payment.update(
          {
            credit_num,
            credit_expire_month,
            credit_expire_year,
            credit_birth,
            credit_password,
          },
          { where: { user_id } }
        );
        return res.status(200).json({ message: "Success" });
      }
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
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
                  credit_expire_month,
                  credit_expire_year,
                  credit_birth,
                  credit_password,
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
  enrollSettlement: async (req, res) => {
    //아임포트로 정산일 등록 API
    const user_id = req.body.userId;
    console.log("======??", req.body);
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
    try {
      const paymentInfo = await Payment.findOne({
        where: { user_id },
        raw: true,
      });
      //정산일 등록에 필요한 정보 모두 있다면 DB에 관련 정보 등록
      if (user_id && settlement_date) {
        if (!paymentInfo) {
          await Payment.create({
            user_id,
            credit_num,
            credit_expire_month,
            credit_expire_year,
            credit_birth,
            credit_password,
            settlement_date,
            account_bank,
            account_number,
          });
        }
        await Payment.update({ settlement_date }, { where: { user_id } });
        return res.status(200).json({ message: "Success" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
