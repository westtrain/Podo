"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Party, {
        through: "User_party",
        foreignKey: "user_id",
      });
      models.User.hasMany(models.Statement, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.User.hasMany(models.Payment, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      socialType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return User;
};
