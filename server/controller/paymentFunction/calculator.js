const dayjs = require("dayjs");
const { User, Statement } = require("../../models");
const { generateImportToken } = require("../importFunction/account");
const { searchScheduleByCustomersUid, unschedule } = require("../importFunction/subscription");
const { makeDataSet, requestPayment } = require("./setPayment");

module.exports = {
  usePoint: async (uid, points, data = {}) => {
    const todayDate = dayjs().date();
    const requiredParams = ["customer_uid", "from", "to", "status"];

    if (!requiredParams.every((param) => data.hasOwnProperty(param))) {
      console.log("insufficient parameters supplied in usePoint Function");
      return -1;
    }

    await generateImportToken().then((token) => {
      searchScheduleByCustomersUid(data, token).then((list) => {
        // 예약된 결제 내역이 있으면 예약을 하나씩 포인트로 결제하고 취소한다.
        let point = points;

        if (list.length > 0) {
          for (let state of list) {
            let uids = {
              customer_uid: state.customer_uid,
              merchant_uid: state.merchant_uid,
            };
            if (point > state.amount) {
              point -= state.amount;
              Statement.update(
                {
                  ott: state.name,
                  type: "usePoint",
                  amount: state.amount,
                },
                { where: { merchant_uid: state.merchant_uid } }
              );
              generateImportToken().then((token) => {
                unschedule(uids, token);
              });
              // 결제 비용으로 사용하고 남은 포인트를 업데이트 해준다.
              User.update(
                {
                  money: point,
                },
                {
                  where: { id: uid },
                }
              );
            } else if (point < state.amount && point > 9) {
              Statement.update(
                {
                  ott: state.name,
                  type: "usePoint",
                  amount: point,
                },
                { where: { merchant_uid: state.merchant_uid } }
              );
              generateImportToken().then((token) => {
                unschedule(dataset, token);
              });
              remain = state.amount - point;
              // 포인트를 사용하고 남은 금액을 다시 당일 예약 결제 요청을 한다.
              const dataset = makeDataSet(uid, state.customer_uid, todayDate, state.name, remain);
              requestPayment(dataset);
              point = 0;
              User.update(
                {
                  money: 0,
                },
                {
                  where: { id: uid },
                }
              );
            } else {
              console.log("Point is empty");
              return -1;
            }
          }
        } else {
          // 예약 결제 내역이 없는 경우
          console.log("No schedualed");
          return -1;
        }
      });
    });
  },

  // 파티 시작일보다 정산일이 빠른 경우, 다음달로 정기 결제 요청하기 위해 월 변경 함수
  //   makeDate: (settlement_date) => {
  //     let date = "";
  //     if (Number(settlement_date) < Number(dayjs().date())) {
  //       date =
  //         new Date(
  //           `${dayjs().year()}-${dayjs().add(1, "month").month() + 1}-${settlement_date}T01:03:00`
  //         ) / 1000;
  //     } else {
  //       date =
  //         new Date(`${dayjs().year()}-${dayjs().month() + 1}-${settlement_date}T01:03:00`) / 1000;
  //     }
  //     return date;
  //   },

  // 결제 가격 계산과 포도머니 우선 결제 함수
  //   calculatePointMoney: (userId, totalPrice, members, pointMoney, usePoint) => {
  //     let result = "";
  //     if (pointMoney >= Math.ceil(totalPrice / members / 10) * 10 && usePoint) {
  //       const reminds = pointMoney - Math.ceil(totalPrice / members / 10) * 10;
  // 결제에 필요한 금액을 뺸 나머지를 업데이트 해줌
  //       User.update(
  //         {
  //           money: reminds,
  //         },
  //         {
  //           where: { id: userId },
  //         }
  //       );
  //       result = Math.ceil(totalPrice / members / 10) * 10 * -1;
  //     } else {
  //       result = Math.ceil(totalPrice / members / 10) * 10;
  //     }
  //     return result;
  //   },
};
