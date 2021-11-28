"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Payment",
      [
        {
          user_id: 1,
          credit_num: "jsfjSF@@#RF#^&@FDSFSDFSWEFSEFSCEW",
          credit_expire_month: "08",
          credit_expire_year: "26",
          credit_birth: "960109",
          credit_password: "sdfwegsfsfj#@sdf#R!WF",
          settlement_date: "10",
          account_bank: "097",
          account_number: "300120006666",
          createdAt: "2021-01-09",
          updatedAt: "2021-01-09",
        },
        {
          user_id: 2,
          credit_num: "wfjsfjSF@@#RF#sfdsdf^&@FDSFSDFSWEF",
          credit_expire_month: "10",
          credit_expire_year: "25",
          credit_birth: "961119",
          credit_password: "sfsfj#@sdf#R!WF",
          settlement_date: "9",
          account_bank: "097",
          account_number: "300120015555",
          createdAt: "2021-01-09",
          updatedAt: "2021-01-09",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Payment", null, {});
  },
};
