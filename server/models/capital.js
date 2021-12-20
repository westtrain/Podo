"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Capital extends Model {}
  Capital.init(
    {
      money: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Capital",
      tableName: "Capital",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Capital;
};
