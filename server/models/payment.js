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
        allowNull: false,
      },
      credit_expire_month: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit_expire_year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit_birth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      settlement_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_bank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
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
