const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  // console.log('Passed isAuth ', req);
  console.log(req.cookies);
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Request no token" });
  }
  try {
    jwt.verify(token, "jwt", async (err, encoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized Request" });
      }
      const userInfo = await User.findOne({ where: { id: encoded.id } });
      if (!userInfo) {
        return res.status(401).json({ message: "Unauthorized Request" });
      }
      req.userId = encoded.id;
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = isAuth;
