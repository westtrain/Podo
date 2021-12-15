const db = require("../models");
const { Payment, User, Party, OTT } = require("../models");
const schedule = require("node-schedule");
const sequelize = require("sequelize");
const moment = require("moment");

const settleMonthly = async () => {
  const settlement_date = moment().format("DD");
  // 1. 정산되어야 하는 파티 조회
  //settlement_date가 오늘인 유저 아이디 조회 위해 Payment의 settlement_date가 당일인 Payment 조회
  const settledPayment = await Payment.findAll(
    { attributes: ["user_id"], where: { settlement_date } },
    { raw: true }
  );
  //해당 Payment의 user_id 조회한 배열 생성
  const settledUser = await Promise.all(
    settledPayment.map((payment) => {
      return payment.dataValues.user_id;
    })
  );

  //유저가 참여하고 있는 파티 불러오기
  let settledParty = await Promise.all(
    settledUser.map((user_id) => {
      let allPartyId = db.sequelize.models.User_party.findAll({
        attributes: ["party_id"],
        where: { user_id },
      });
      return allPartyId;
    })
  );
  // 파티 아이디만 담기
  settledParty = settledParty.flat().map((party) => {
    return party.dataValues.party_id;
  });

  // 2. 각 파티의 리더에게 ott price * (n-1/n)만큼 포도머니 채워주기
  Promise.all(
    settledParty.map((party_id) => {
      Party.findOne({ where: { id: party_id } }).then((party) => {
        OTT.findOne({ attributes: ["price"], where: { id: party.ott_id } }).then((data) => {
          const price = data.price;
          const joinedMemberNum = party.members.split(",").length;
          const money = (price * (joinedMemberNum - 1)) / joinedMemberNum;
          console.log("money=======", money);
          User.update({ money }, { where: { id: party.leader } });
        });
      });
    })
  );
};

module.exports = { settleMonthly };
