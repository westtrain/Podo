const db = require("../models");
const { Party } = require("../models");

module.exports = {
  getUsersParty: async (req, res) => {
    const userId = req.userId;
    const usersParties = [];
    // console.log(userId);
    try {
      const allUsersPartiesId = await db.sequelize.models.User_party.findAll({
        attributes: ["party_id"],
        where: {
          user_id: userId,
        },
        raw: true,
      });
      for (let i = 0; i < allUsersPartiesId.length; i++) {
        const usersParty = await Party.findOne({
          where: {
            id: allUsersPartiesId[i].party_id,
          },
          raw: true,
        });
        // console.log(usersParty);
        usersParties[i] = usersParty;
      }

      if (!usersParties) {
        return res.status(404).json({ message: "failed" });
      }
      return res.status(200).json({ data: usersParties });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  getParty: async (req, res) => {
    const partyId = req.params.id;
    try {
      const partyInfo = await Party.findOne({
        where: {
          id: partyId,
        },
        raw: true,
      });
      if (!partyInfo) {
        return res.status(404).json({ message: "failed" });
      }
      return res.status(200).json({ data: partyInfo });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  getAllParties: async (req, res) => {
    try {
      console.log("allPartiesInfo");
      const allPartiesInfo = await Party.findAll({
        raw: true,
      });
      if (!allPartiesInfo) {
        return res.status(404).json({ message: "failed" });
      }
      return res.status(200).json({ data: allPartiesInfo });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  getFilteredParties: async (req, res) => {
    // 0. 쿼리에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const ottId = req.query.ott_id;
    const filteredPartiesByDate = [];
    let date = null;

    if (req.query.date) {
      date = req.query.date;
    }

    try {
      // 1. ottId로 조회해서 filteredPartiesByOttId에 담는다
      const filteredPartiesByOttId = await Party.findAll({
        where: {
          ott_id: ottId,
        },
        raw: true,
      });
      // 2. 특정 날짜가 있다면 날짜와 같은 정보만 담는다.
      if (date) {
        for (let party of filteredPartiesByOttId) {
          if (party.start_date === date) {
            filteredPartiesByDate.push(party);
          }
        }
        if (!filteredPartiesByDate) {
          return res.status(404).json({ message: "failed" });
        }
        return res.status(200).json({ data: filteredPartiesByDate });
      }
      // 3. 특정 날짜가 없다면 원래 아이디로 조회한 내역만 보낸다.
      if (!filteredPartiesByOttId) {
        return res.status(404).json({ message: "failed" });
      }
      return res.status(200).json({ data: filteredPartiesByOttId });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  createParty: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  updateOTTLoginInfo: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  changeMemberNum: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  joinParty: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  leaveParty: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
