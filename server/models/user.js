"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Party, {
        through: "User_party",
        foreignKey: "user_id",
      });
    models.User.belongsTo(models.Statement, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    models.User.belongsTo(models.Payment, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
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
    }
  );

  return User;
};
