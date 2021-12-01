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
    // 0. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const userId = req.userId;
    // 1. 바디에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const {
      ott_id,
      ott_login_id,
      ott_login_password,
      members,
      members_num,
      leader,
      start_date,
      end_date,
    } = req.body;
    // console.log(ott_id);
    try {
      if (
        ott_id &&
        ott_login_id &&
        ott_login_password &&
        members &&
        members_num &&
        leader &&
        start_date &&
        end_date
      ) {
        // 2. 각 변수에 담기 값을 알맞는 필드에 넣고 업데이트한다.
        await Party.create({
          ott_id: ott_id,
          ott_login_id: ott_login_id,
          ott_login_password: ott_login_password,
          members: members,
          members_num: members_num,
          leader: leader,
          start_date: start_date,
          end_date: end_date,
        });
      } else {
        return res.status(422).json({ message: "insufficient parameters supplied" });
      }
      return res.status(201).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  updateOTTLoginInfo: async (req, res) => {
    // 0. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const userId = req.userId;
    // 1. 바디에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const { party_id, ott_login_id, ott_login_password } = req.body;
    try {
      // 2. partyId, userId로 조회해서 OTT 로그인 정보를 업데이트 시켜준다
      console.log(userId);
      const newOttLoginInfo = await Party.update(
        {
          ott_login_id: ott_login_id,
          ott_login_password: ott_login_password,
        },
        {
          where: {
            id: party_id,
            leader: userId,
          },
        }
      );
      // console.log(newOttLoginInfo);
      if (!newOttLoginInfo) {
        return res.status(404).json({ message: "failed" });
      }
      return res.status(200).json({ message: "Success" });
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
