"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Statement",
      [
        {
          user_id: 1,
          ott: "넷플릭스",
          type: "payment",
          amount: 26000,
          createdAt: "2021-01-09",
          updatedAt: "2021-01-09",
        },
        {
          user_id: 2,
          ott: "왓챠",
          type: "point",
          amount: 10000,
          createdAt: "2021-01-09",
          updatedAt: "2021-01-09",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Statement", null, {});
  },
};
