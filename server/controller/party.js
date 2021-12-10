const db = require("../models");
const { Party } = require("../models");

module.exports = {
  getUsersParty: async (req, res) => {
    const user_id = req.userId;
    const usersParties = [];
    try {
      const allUsersPartiesId = await db.sequelize.models.User_party.findAll({
        attributes: ["party_id"],
        where: { user_id },
        raw: true,
      });
      console.log(allUsersPartiesId);
      for (let i = 0; i < allUsersPartiesId.length; i++) {
        const usersParty = await Party.findOne({
          where: {
            id: allUsersPartiesId[i].party_id,
          },
          raw: true,
        });
        console.log(usersParty);
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
    const party_id = req.params.id;
    console.log(party_id);
    try {
      const partyInfo = await Party.findOne({
        where: { id: party_id },
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
    const ott_id = req.query.ott_id;
    const filteredPartiesByDate = [];
    let date = null;

    if (req.query.date) {
      date = req.query.date;
    }

    try {
      // 1. ottId로 조회해서 filteredPartiesByOttId에 담는다
      const filteredPartiesByOttId = await Party.findAll({
        where: { ott_id },
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
    const user_id = req.userId;
    // 1. 바디에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const { ott_id, ott_login_id, ott_login_password, members, members_num, start_date, end_date } =
      req.body;
    try {
      if (
        ott_id &&
        ott_login_id &&
        ott_login_password &&
        members &&
        members_num &&
        start_date &&
        end_date
      ) {
        // 같은 ott종류의 이미 create나 join한 파티가 있다면 create 방지. ex) 넷플 파티에 이미 create/join 했는데 또 넷플 파티 만들려고 하는 경우

        // 1차 필터링: Party 테이블에서 create하려는 ott를 공유하고 있는 파티 조회
        const ottParty = await Party.findAll({ where: { ott_id } });

        // 2차 필터링: 1개 이상 있다면 map을 사용하여 각 파티에 '현재 create하려는 유저'가 있는지 확인
        if (ottParty.length !== 0) {
          //alreadyJoined는 실행되지 않은 Promise로 Promise.all을 사용하지 않으면 alreadyJoinedArr는 Promise 배열이 나오게 됨.
          let alreadyJoinedArr = await Promise.all(
            ottParty.map((party) => {
              const alreadyJoined = db.sequelize.models.User_party.findAll({
                where: { party_id: party.dataValues.id, user_id },
              });
              return alreadyJoined;
            })
          );
          // map과 Promise.all 사용으로 인해 비어있어도 2차원배열('[[]]')로 나오기 때문에 flat 사용
          alreadyJoinedArr = alreadyJoinedArr.flat();
          console.log(alreadyJoinedArr);

          //해당 유저가 있다면 422 에러
          if (alreadyJoinedArr.length !== 0) {
            return res
              .status(422)
              .json({ message: "You already created or joined the same party" });
          }
        }

        // 2. 각 변수에 담기 값을 알맞는 필드에 넣고 업데이트한다.
        await Party.create({
          ott_id,
          ott_login_id,
          ott_login_password,
          members,
          members_num,
          leader: user_id,
          start_date,
          end_date,
        }).then((data) => {
          // 3. 조인테이블에 유저아이디(파티장)와 파티를 넣어준다.
          db.sequelize.models.User_party.create({
            party_id: data.id,
            user_id,
          });
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
          ott_login_id,
          ott_login_password,
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
    // 0. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const userId = req.userId;
    // 1. 바디에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const { party_id, members_num } = req.body;
    try {
      // 2. partyId, userId로 조회해서 OTT 로그인 정보를 업데이트 시켜준다
      await Party.update(
        { members_num },
        {
          where: {
            id: party_id,
            leader: userId,
          },
        }
      ).then((data) => {
        if (!data) {
          return res.status(404).json({ message: "failed" });
        }
      });
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  joinParty: async (req, res) => {
    // 0. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const user_id = req.userId;
    // 1. 바디에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const { party_id } = req.body;
    try {
      // 2. 유저가 이 파티에 맴버로 있는지 확인
      const isMember = await db.sequelize.models.User_party.findAll({
        where: { party_id, user_id },
      }); //where 빠졌었음. await 넣어야 promise형태가 아닌 배열 형태의 결과값 나옴
      if (isMember.length !== 0) {
        //배열 형태에서 비어있음을 표현하기 위해서는 length 사용해야 함.
        return res.status(422).json({ message: "You already created or joined this party" });
      }

      // Edge Case: 같은 ott종류의 이미 create나 join한 파티가 있다면 create 방지. ex) 넷플 파티에 이미 create/join 했는데 또 넷플 파티 만들려고 하는 경우

      // 1차 필터링: Party 테이블에서 create하려는 ott를 공유하고 있는 파티 조회
      const ott = await Party.findOne({ where: { id: party_id } });
      console.log("ott======================", ott);
      const ottParty = await Party.findAll({ where: { ott_id: ott.dataValues.ott_id } });
      console.log("ottParty================", ottParty);

      // 2차 필터링: 1개 이상 있다면 map을 사용하여 각 파티에 '현재 create하려는 유저'가 있는지 확인
      if (ottParty.length !== 0) {
        //alreadyJoined는 실행되지 않은 Promise로 Promise.all을 사용하지 않으면 alreadyJoinedArr는 Promise 배열이 나오게 됨.
        let alreadyJoinedArr = await Promise.all(
          ottParty.map((party) => {
            const alreadyJoined = db.sequelize.models.User_party.findAll({
              where: { party_id: party.dataValues.id, user_id },
            });
            return alreadyJoined;
          })
        );
        // map과 Promise.all 사용으로 인해 비어있어도 2차원배열('[[]]')로 나오기 때문에 flat 사용
        alreadyJoinedArr = alreadyJoinedArr.flat();
        console.log(alreadyJoinedArr);

        //해당 유저가 있다면 422 에러
        if (alreadyJoinedArr.length !== 0) {
          return res.status(422).json({
            message: "You already created or joined the party that shares the same kind of OTT",
          });
        }
      }

      // 3. party_id로 조회한다.
      await Party.findOne({
        where: { id: party_id },
      }).then((data) => {
        // 4. party_id로 조회가 실패하면 404를 반환한다.
        if (!data) {
          return res.status(404).json({ message: "failed" });
        }
        // 5. 기존의 멤버에 새로운 맴버인 userId를 추가하고 업데이트 시킨다.
        let members = data.members;
        if (members.length === data.numbers_num) {
          return res.status(422).json({ meessage: "Party already full" });
        }
        members += `,${user_id}`;
        Party.update({ members }, { where: { id: party_id } });
        // 6. 새 유저와 파티관계를 조인테이블에 넣어준다
        db.sequelize.models.User_party.create({ party_id, user_id });
      });
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  leaveParty: async (req, res) => {
    // 0. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const userId = req.userId;
    // 1. 바디에서 받은 정보를 구조분해할당으로 각 변수에 담는다.
    const { party_id } = req.body;
    try {
      // 2. partyId로 조회한다.
      await Party.findOne({
        where: { id: party_id },
      }).then((data) => {
        // 3. partyId로 조회가 실패하면 404를 반환한다.
        if (!data) {
          return res.status(404).json({ message: "failed" });
        }
        // 4. 기존의 멤버에 탈퇴하려는 맴버인 userId를 삭제하고 업데이트 시킨다.
        let members = data.members;
        // 5. 파티장은 삭제되면 안된다.
        if (members.length !== 1) {
          members = members.replace(`,${userId}`, "");
          Party.update({ members }, { where: { id: party_id } });
          db.sequelize.models.User_party.destroy({
            where: {
              party_id: party_id,
              user_id: userId,
            },
          });
        }
      });
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
