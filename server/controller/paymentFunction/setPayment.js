const { Statement } = require("../../models");
const { generateImportToken } = require("../importFunction/account");
const { createSchedule } = require("../importFunction/subscription");
// const { makeDate } = require("./calculator");
const dayjs = require("dayjs");

// 파티 시작일보다 정산일이 빠른 경우, 다음달로 정기 결제 요청하기 위해 월 변경 함수
const makeDate = (settlement_date) => {
  let date = "";
  if (Number(settlement_date) < Number(dayjs().date())) {
    date =
      new Date(
        `${dayjs().year()}-${dayjs().add(1, "month").month() + 1}-${settlement_date}T01:03:00`
      ) / 1000;
  } else {
    date = new Date(`${dayjs().year()}-${dayjs().month() + 1}-${settlement_date}T01:03:00`) / 1000;
  }
  return date;
};

module.exports = {
  // 아임포트가 요구하는 결제에 필요한 데이터를 올바른 형태로 만들어주는 함수
  makeDataSet: (userId, customerId, settlementDate, ottName, amount) => {
    return {
      user_id: userId,
      customer_uid: customerId,
      checking_amount: "10",
      schedules: [
        {
          merchant_uid: `merchant_${dayjs().valueOf()}${userId}`,
          schedule_at: makeDate(settlementDate),
          currency: "KRW",
          amount: amount,
          name: ottName,
        },
      ],
    };
  },

  // 아임포트에 결제 예약 요청 후 결제 내역 데이타 베이스에 저장하는 함수
  requestPayment: (data = {}) => {
    const requiredParams = ["user_id", "customer_uid", "checking_amount", "schedules"];
    const requiredParamsSchedules = ["merchant_uid", "schedule_at", "currency", "amount", "name"];
    // 각 파라미터가 잘 전달됬는지 확인 후 필수 항목이 빠졌으면 -1을 반환
    if (!requiredParams.every((param) => data.hasOwnProperty(param))) {
      console.log("insufficient parameters supplied");
      console.log(data);
      return -1;
    }
    if (!requiredParamsSchedules.every((param) => data.schedules[0].hasOwnProperty(param))) {
      console.log("insufficient parameters supplied of schedules");
      return -1;
    }

    generateImportToken() // 아임포트 토큰 발행
      .then((token) => createSchedule(data, token)) // 정기 결제 요청
      .then((result) => {
        // 전달 데이터에 문제가 있는 경우
        if (result.data.code === -1) {
          console.log(result.data.message);
          return -1;
        }
        // console.log(result.data.response, "payment info2"); //결제 정보
        Statement.create({
          user_id: data.user_id,
          merchant_uid: data.schedules[0].merchant_uid,
          ott: data.schedules[0].name,
          type: "pending",
          amount: data.schedules[0].amount,
        });
      });
  },
};
