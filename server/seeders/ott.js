"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "OTT",
      [
        { id: 1, name: "넷플릭스", price: 12000 },
        { id: 2, name: "왓챠", price: 10000 },
        { id: 3, name: "웨이브", price: 9000 },
        { id: 4, name: "티빙", price: 8000 },
        { id: 5, name: "디즈니 플러스", price: 20000 },
        { id: 6, name: "프라임 비디오", price: 15000 },
        { id: 7, name: "라프텔", price: 9000 },
        { id: 8, name: "애플", price: 10000 },
        { id: 9, name: "오피스 365", price: 5000 },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("area", null, {});
  },
};
