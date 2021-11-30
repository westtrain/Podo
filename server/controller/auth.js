const { User } = require("../models");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const { generateAccessToken } = require("./tokenfunction/index");

module.exports = {
  naverLogin: async (req, res) => {
    res.redirect(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}/&state=naver`
    );
  },

  naverCallback: async (req, res) => {
    const code = req.query.code;

    try {
      console.log(code);
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&code=${code}&state=naver`
      );
      console.log("===============Token Info================", result.data);
      const userInfo = await axios.get(
        // access token로 유저정보 요청
        "https://openapi.naver.com/v1/nid/me",
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      console.log("================userInfo================", userInfo.data);
      //받아온 유저정보로 findOrCreate
      const user = await User.findOrCreate({
        where: {
          email: userInfo.data.response.email,
          socialType: "naver",
        },
        defaults: {
          email: userInfo.data.response.email, // 네이버에서 받아온 유저정보의 이메일
          socialType: "naver",
        },
      });
      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        socialType: user[0].dataValues.socialType,
      });

      console.log("==================token==================", token);

      res.cookie("jwt", token, {
        sameSite: "None",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
        domain: "http://localhost:4000",
      });

      // response.sendRedirect(request.getHeader("referer"));
      res.redirect(`${process.env.CLIENT_URI}`); //가입완료 후 화면
    } catch (error) {
      console.log("error");
      res.sendStatus(500);
    }
  },
};
