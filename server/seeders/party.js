"use strict";
const XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = XLSX.readFile(__dirname + "/../public/podo.xlsx");
    const worksheet = workbook.Sheets["Parties"];

    const data = [];
    // 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
    for (let i = 1; i <= 321; i++) {
      const obj = {
        ott_id: `${worksheet["A" + i].w}`,
        ott_login_id: `${worksheet["B" + i].w}`,
        ott_login_password: `${worksheet["C" + i].w}`,
        members: `${worksheet["D" + i].w}`,
        members_num: `${worksheet["E" + i].w}`,
        leader: `${worksheet["F" + i].w}`,
        period: `${worksheet["G" + i].w}`,
        start_date: `${worksheet["H" + i].w}`,
        end_date: `${worksheet["I" + i].w}`,
        createdAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        updatedAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      };
      data.push(obj);
    }
    return queryInterface.bulkInsert("Parties", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Parties", null, {});
  },
};
