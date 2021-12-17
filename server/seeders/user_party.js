"use strict";
const XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = XLSX.readFile(__dirname + "/../public/podo.xlsx");
    const worksheet = workbook.Sheets["User_party"];

    const data = [];
    for (let i = 1; i <= 338; i++) {
      const obj = {
        party_id: `${worksheet["A" + i].w}`,
        user_id: `${worksheet["B" + i].w}`,
        createdAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        updatedAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      };
      data.push(obj);
    }
    return queryInterface.bulkInsert("User_party", data, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User_party", null, {});
  },
};
