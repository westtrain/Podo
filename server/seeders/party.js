"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Parties",
      [
        {
          ott_id: 1,
          ott_login_id: "abc@gmail.com",
          ott_login_password: "google",
          members: "1,2",
          members_num: 2,
          leader: 1,
          start_date: "2021-01-10",
          end_date: "2022-01-09",
          createdAt: "2021-01-09",
          updatedAt: "2021-01-09",
        },
        {
          ott_id: 2,
          ott_login_id: "muyaho@naver.com",
          ott_login_password: "naver",
          members: "1,2",
          members_num: 2,
          leader: 2,
          start_date: "2021-01-10",
          end_date: "2022-01-09",
          createdAt: "2021-01-09",
          updatedAt: "2021-01-09",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Parties", null, {});
  },
};
