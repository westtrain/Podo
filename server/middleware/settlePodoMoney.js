const db = require("../models");
const { User, Party, Payment, Statement, OTT } = require("../models");
const moment = require("moment");

const settlePodoMoney = async () => {
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
      const allPartyId = db.sequelize.models.User_party.findAll({
        attributes: ["party_id"],
        where: { user_id },
      });
      return allPartyId;
    })
  );
  // 파티 아이디만 담기
  settledParty = settledParty.flat().map((party) => {
    return party.party_id;
  });
  // 중복 제거
  settledParty = settledParty.filter((element, index) => {
    return settledParty.indexOf(element) === index;
  });
  console.log("settledParty========", settledParty);

  // 2. 각 파티의 리더에게 ott price * (n-1/n)만큼 포도머니 채워주기
  Promise.all(
    settledParty.map((party_id) => {
      Party.findOne({ where: { id: party_id } }).then((party) => {
        const leader = party.leader;

        OTT.findOne({ attributes: ["name", "price"], where: { id: party.ott_id } }).then((data) => {
          const name = data.name;
          const price = data.price;
          const joinedMemberNum = party.members.split(",").length;
          const collect = parseInt((price * (joinedMemberNum - 1)) / joinedMemberNum); // 적립될 포도머니 금액
          console.log("money=======", collect);

          User.findOne({ attributes: ["money"], where: { id: leader } }).then((data) => {
            const money = data.money + collect;

            //유저의 기존 포도머니에 collect 더해서 업데이트
            User.update({ money }, { where: { id: leader } });
            // Statement 적립 내역 업데이트
            Statement.create(
              {
                user_id: leader,
                ott: name,
                type: "point",
                amount: collect,
              },
              { where: { user_id: leader } }
            );
          });
        });
      });
    })
  );
};

module.exports = { settlePodoMoney };
