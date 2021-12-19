"use strict";
const XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = XLSX.readFile(__dirname + "/../public/podo.xlsx");
    const worksheet = workbook.Sheets["Users"];

    const data = [];
    // 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
    for (let i = 1; i <= 60; i++) {
      const obj = {
        name: `${worksheet["A" + i].w}`,
        email: `${worksheet["B" + i].w}`,
        socialType: `${worksheet["C" + i].w}`,
        money: `${worksheet["D" + i].w}`,
        deposit: `${worksheet["E" + i].w}`,
        image: `${worksheet["F" + i].w}`,
        createdAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        updatedAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      };
      data.push(obj);
    }
    return queryInterface.bulkInsert("Users", data, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
