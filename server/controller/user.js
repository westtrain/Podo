const { User } = require("../models");

module.exports = {
  getUser: async (req, res) => {
    // 유저 상세 정보 조회
    // console.log(req.userId);
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
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userInfo = await User.findOne({
        attributes: ["id", "name", "email", "socialType", "money", "deposit"],
        where: { id: req.userId },
        raw: true,
      });
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
