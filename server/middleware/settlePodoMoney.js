const db = require("../models");
const { User, Party, Payment, Statement, OTT, Capital } = require("../models");
const dayjs = require("dayjs");

const settlePodoMoney = async () => {
  const settlement_date = dayjs().format("DD");
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

  // 2. Capital 업데이트
  for (let i = 0; i < settledParty.length; i++) {
    const id = settledParty[i];
    await Party.findOne({ where: { id } }).then(async (party) => {
      const leader = party.leader;
      const OTTinfo = await OTT.findOne({
        attributes: ["name", "price"],
        where: { id: party.ott_id },
      });
      const name = OTTinfo.name;
      const price = OTTinfo.price;
      const joinedMemberNum = party.members.split(",").length;
      let collect = (price * (joinedMemberNum - 1)) / joinedMemberNum; // 적립될 포도머니 금액
      collect = Math.ceil(collect / 10) * 10;

      const capitalNum = await Capital.count();
      const capitalInfo = await Capital.findOne({ where: { id: capitalNum } });
      const total_amount = (await capitalInfo.total_amount) - collect;
      await Capital.create({ money: collect, total_amount, state: "출금" });

      // 3. 각 파티의 리더에게 ott price * (n-1/n)만큼 포도머니 채워주기
      const user = await User.findOne({ attributes: ["money"], where: { id: leader } });
      const money = user.money + collect;

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
  }
};

module.exports = { settlePodoMoney };
