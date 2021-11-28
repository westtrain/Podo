"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    static associate(models) {
      models.Party.belongsToMany(models.User, {
        through: "User_party",
        foreignKey: "Party_id",
      });
      models.Party.belongsTo(models.OTT, {
        foreignKey: "ott_id",
        targetKey: "id",
      });
    }
  }

  Party.init(
    {
      ott_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ott_login_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ott_login_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      members: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      members_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      leader: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Party",
      tableName: "Parties",
    }
  );

  return Party;
};
