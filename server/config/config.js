const dotenv = require("dotenv");
require("dotenv").config();
/*
const userName = require("DATABASE_USERNAME");
const password = require("DATABASE_PASSWORD");
const database = require("DATABASE_NAME");
const host = require("DATABASE_HOST");
const port = require("DATABASE_PORT");
*/
module.exports = {
  port: {
    port: process.env.PORT,
  },
  local: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
  },
  // development: {
  //   username: userName,
  //   password: password,
  //   database: database,
  //   host: host,
  //   port: port,
  //   dialect: "mysql",
  //   timezone: "+09:00",
  // },
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    timezone: "+09:00",
  },

  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    timezone: "+09:00",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    timezone: "+09:00",
  },
};
