const { Payment } = require("../models");

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
  changeCard: async (req, res) => {
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
        //토스 API로 카드 확인
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
  changeAccount: async (req, res) => {
    const user_id = req.userId;
    const { account_bank, account_number } = req.body;
    try {
      if (user_id && account_bank && account_number) {
        //금융결제원 수취조회 API
        await Payment.update({ account_bank, account_number }, { where: { user_id } });
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
        // 토스 API로 정기결제일 변경
        await Payment.update({ settlement_date }, { where: { user_id } });
        return res.status(200).json({ message: "Success" });
      }
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollCard: async (req, res) => {
    const user_id = req.body.userId;
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
      //토스 API로 카드 확인
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
          { credit_num, credit_expire_month, credit_expire_year, credit_birth, credit_password },
          { where: { user_id } }
        );
        return res.status(200).json({ message: "Success" });
      }
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollAccount: async (req, res) => {
    // 금융결제원 수취조회 API
    const user_id = req.body.userId;
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
      if (user_id && account_bank && account_number) {
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
        await Payment.update({ account_bank, account_number }, { where: { user_id } });
      }
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollSettlement: async (req, res) => {
    //토스 정산일 등록 API
    const user_id = req.body.userId;
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
