"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OTT extends Model {
    static associate(models) {
      models.OTT.hasMany(models.Party, {
        foreignKey: "ott_id",
        sourceKey: "id",
      });
    }
  }
  OTT.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      max_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OTT",
      tableName: "OTT",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return OTT;
};
