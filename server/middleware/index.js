const schedule = require("node-schedule");
const { settlePodoMoney } = require("./settlePodoMoney");
const { requestPaymentByStartDate } = require("./requestPayment");
const { cancelParty } = require("./cancelParty");


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
        cancelParty();
      } catch (err) {
        console.error(err);
      }
    });
  },
};
