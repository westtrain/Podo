"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Capital extends Model {}
  Capital.init(
    {
      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Capital",
      tableName: "Capital",
    }
  );

  return Capital;
};
