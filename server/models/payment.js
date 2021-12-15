"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      models.Payment.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Payment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credit_num: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_uid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      settlement_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_bank: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "Payment",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Payment;
};
