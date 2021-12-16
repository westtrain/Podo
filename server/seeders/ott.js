"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "OTT",
      [
        { id: 1, name: "넷플릭스", price: 17000 },
        { id: 2, name: "왓챠", price: 12900 },
        { id: 3, name: "웨이브", price: 13900 },
        { id: 4, name: "티빙", price: 13900 },
        { id: 5, name: "디즈니 플러스", price: 9900 },
        { id: 6, name: "프라임 비디오", price: 7200 },
        { id: 7, name: "라프텔", price: 14900 },
        { id: 8, name: "애플", price: 6500 },
        { id: 9, name: "오피스 365", price: 11300 },
        { id: 10, name: "닌텐도", price: 4900 },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("area", null, {});
  },
};
