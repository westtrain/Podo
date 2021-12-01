"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          name: "Kimcoding",
          email: "kimcoding@codestates.com",
          socialType: "google",
          money: 9000,
          deposit: 20000,
          createdAt: "2021-11-30 00:00:00",
          updatedAt: "2021-11-30 01:00:00",
        },
        {
          id: 2,
          name: "Parkhacker",
          email: "parkhacker@codestates.com",
          socialType: "kakao",
          money: 9000,
          deposit: 20000,
          createdAt: "2021-11-30 00:00:00",
          updatedAt: "2021-11-30 01:00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
