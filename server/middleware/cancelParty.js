const { Party } = require("../models");
const dayjs = require("dayjs");

const cancelParty = async () => {
  const start_date = dayjs().format("YYYY-MM-DD");

  // 시작일이 당일인 파티 조회
  let unfulfilledParty = await Party.findAll({
    where: { start_date },
  });

  // 멤버 수가 1명만 있는 파티 필터링
  unfulfilledParty = await Promise.all(
    unfulfilledParty.map((party) => {
      if (party.members.length <= 1) {
        return party;
      }
    })
  );

  //해당 파티 삭제
  unfulfilledParty = await Promise.all(
    unfulfilledParty.map((party) => {
      party.destroy();
    })
  );
};

module.exports = { cancelParty };
