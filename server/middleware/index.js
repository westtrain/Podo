const schedule = require("node-schedule");
const { settlePodoMoney } = require("./settlePodoMoney");
const { requestPaymentByStartDate, usePointMoney } = require("./requestPayment");

module.exports = {
  settleMonthly: (s) => {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = s.dayOfWeek;
    rule.hour = s.hour;
    rule.minute = s.minute;

    schedule.scheduleJob(rule, async () => {
      try {
        console.log("예약된 작업 실행!");
        settlePodoMoney();
        requestPaymentByStartDate();
        usePointMoney();
      } catch (err) {
        console.error(err);
      }
    });
  },
};
