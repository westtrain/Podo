"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Statement extends Model {
    static associate(models) {
      models.Statement.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Statement.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ott: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Statement",
      tableName: "Statement",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Statement;
};
