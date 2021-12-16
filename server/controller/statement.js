const { Statement } = require("../models");

module.exports = {
  getPaymentPointWithdrawal: async (req, res) => {
    // 모든 내역를 조회해서 클라이언트로 보내준다.
    const userId = req.userId;
    try {
      const statementInfo = await Statement.findAll({
        where: {
          user_id: userId,
        },
        raw: true,
      });
      if (statementInfo) {
        return res.status(200).json({ data: statementInfo });
      }
      return res.status(404).json({ message: "Failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
