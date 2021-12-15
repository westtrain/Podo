const { User, Party, Payment, Statement } = require("../models");
const db = require("../models");

module.exports = {
  getUser: async (req, res) => {
    // 유저 상세 정보 조회
    const userInfo = await User.findOne({
      attributes: ["id", "name", "email", "socialType", "money", "deposit", "image"],
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

  updateProfileImage: async (req, res) => {
    console.log(req.params);
    // params로 받은 id로 이미지를 업데이트 한다.
    const userImage = await User.update({ image: req.params.id }, { where: { id: req.userId } });
    try {
      if (userImage) {
        return res.status(200).json({ message: "Sucess to change image" });
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
        let userInfo = await User.findOne({
          attributes: ["money"],
          where: { id: user_id },
          raw: true,
        });
        const result = userInfo.money - withdraw;
        await User.update({ money: result }, { where: { id: user_id } });
        userInfo = await User.findOne({
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
    const user_id = req.userId;
    try {
      //해당 아이디를 가진 유저 조회
      const userInfo = await User.findOne({
        attributes: ["id", "name", "email", "socialType", "money", "deposit"],
        where: { id: req.userId },
        raw: true,
      });

      // 모든 파티 탈퇴했는지 여부 조회
      const userPartyInfo = await db.sequelize.models.User_party.findAll({
        where: { user_id },
      });
      if (userPartyInfo.length !== 0) {
        return res.status(422).json({ message: "Have to leave all parties you joined" });
      }
      //해당 유저가 있다면 데이터 삭제
      if (userInfo) {
        User.destroy({ where: { id: user_id } });
        Payment.destroy({ where: { user_id } });
        Statement.destroy({ where: { user_id } });
        //Party member 삭제
        db.sequelize.models.User_party.destroy({
          where: { user_id },
        });
        return res.status(200).json({ message: "Success" });
      }
      return res.status(401).json({ message: "Unauthorized request" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
