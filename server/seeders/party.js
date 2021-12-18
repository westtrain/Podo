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
          members: "1,2,3",
          members_num: 3,
          leader: 1,
          start_date: "2021-12-17",
          end_date: "2022-01-09",
          createdAt: "2021-12-17",
          updatedAt: "2021-01-09",
        },
        {
          ott_id: 2,
          ott_login_id: "muyaho@naver.com",
          ott_login_password: "naver",
          members: "2,1",
          members_num: 4,
          leader: 2,
          start_date: "2021-12-17",
          end_date: "2022-01-09",
          createdAt: "2021-12-17",
          updatedAt: "2021-01-09",
        },
        {
          ott_id: 3,
          ott_login_id: "muyaho@naver.com",
          ott_login_password: "naver",
          members: "2",
          members_num: 4,
          leader: 2,
          start_date: "2021-12-17",
          end_date: "2022-01-09",
          createdAt: "2021-12-17",
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
