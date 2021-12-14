const { User, Party, OTT, db } = require("../models");
const schedule = require("node-schedule");
const moment = require("moment");

const settleMonthly = async () => {
  const settlement_date = moment.format("YYYY-MM-DD");

  //settlement_date가 오늘인 유저만 조회
  const settledUser = await User.findAll({ where: { settlement_date }, raw: true });

  await Promise.all(
    settledUser.map((user) => {
      const allPartyId = db.sequelize.models.User_party.findAll({ where: { user_id: user.id } });

      allPartyId.map((party_id) => {
        const party = Party.findOne({ where: { id: party_id } });

        if (party.leader === user.id) {
          const price = OTT.findOne({ where: { id: party.ott_id } });
          const joinedMemberNum = party.members.split().length;
          const money = (price * (joinedMemberNum - 1)) / joinedMemberNum;
          User.update({ money }, { where: { id: user.id } });
        }
      });
    })
  );
};

module.exports = { settleMonthly };
