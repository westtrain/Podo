const { User } = require("../models");

module.exports = {
  getUser: async (req, res) => {
    // 유저 상세 정보 조회
    const userInfo = await User.findOne({
      attributes: ["id", "name", "email", "socialType", "money", "deposit"],
      where: { id: req.userId },
      raw: true,
    });
    try {
      if (userInfo) {
        return res.status(200).json({ data: userInfo });
      }
      return res.status(401).json({ message: "Unauthorized request" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  updateMoney: async (req, res) => {
    // 토스API 이용하여 포도머니를 계좌로 인출
    try {
      const user_id = req.userId;
      const withdraw = req.query.withdraw;
      if (user_id) {
        const userMoney = await User.findOne({
          attributes: ["money"],
          where: { id: user_id },
          raw: true,
        });
        const result = userMoney.money - withdraw;
        await User.update({ money: result }, { where: { id: user_id } });
        const userInfo = await User.findOne({
          attributes: ["id", "name", "email", "socialType", "money", "deposit"],
          where: { id: user_id },
          raw: true,
        });
        return res.status(200).json({ data: userInfo });
      }
      return res.status(401).json({ message: "Unauthorized request" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      //해당 아이디를 가진 유저 조회
      const userInfo = await User.findOne({
        attributes: ["id", "name", "email", "socialType", "money", "deposit"],
        where: { id: req.userId },
        raw: true,
      });
      //해당 유저가 있다면 데이터 삭제
      if (userInfo) {
        await User.destroy({ where: { id: req.userId } });
        return res.status(200).json({ message: "Success" });
      }
      return res.status(401).json({ message: "Unauthorized request" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
