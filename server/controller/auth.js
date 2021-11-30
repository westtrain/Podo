const { User } = require("../models");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const { generateAccessToken, sendAccessToken } = require("./tokenFunction");

module.exports = {
  naverLogin: async (req, res) => {
    res.redirect(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}/&state=naver`
    );
    console.log(res);
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
          name: "abc", //추후 randomNameAPI 사용하여 name 발급
          socialType: "naver",
          deposit: 0,
          money: 0,
        },
      });
      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        socialType: user[0].dataValues.socialType,
      });

      console.log("==================token==================", token);

      sendAccessToken(res, token);

      // response.sendRedirect(request.getHeader("referer"));
      res.redirect(`${process.env.CLIENT_URI}`); //가입완료 후 화면
    } catch (error) {
      console.log("error");
      res.sendStatus(500);
    }
  },

  kakaoLogin: async (req, res) => {
    res.redirect(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`
    );
  },

  kakaoCallback: async (req, res) => {
    const code = req.query.code;
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`
      );

      console.log("===============AccessToken Info================", result.data);
      const userInfo = await axios.get(
        // access token로 유저정보 요청
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      console.log("================userInfo================", userInfo.data);
      // 유저가 이메일 제공에 동의했다면
      if (userInfo.data.kakao_account.email) {
        const user = await User.findOrCreate({
          where: {
            email: userInfo.data.email,
            socialType: "kakao",
          },
          defaults: {
            email: userInfo.data.email, // 카카오에서 받아온 유저정보의 이메일
            name: "abc", //추후 randomNameAPI 사용하여 name 발급
            socialType: "kakao",
            deposit: 0,
            money: 0,
          },
        });

        const token = generateAccessToken({
          id: user[0].dataValues.id,
          email: user[0].dataValues.email,
          socialType: user[0].dataValues.socialType,
        });

        console.log("==================jwt==================", token);

        sendAccessToken(res, token);
      } else {
        //동의하지 않았다면
        const user = await User.findOrCreate({
          where: {
            email: userInfo.data.id,
            socialType: "kakao",
          },
          defaults: {
            email: userInfo.data.id, // 카카오에서 받아온 유저정보의 아이디
            name: "abc", //추후 randomNameAPI 사용하여 name 발급
            socialType: "kakao",
            deposit: 0,
            money: 0,
          },
        });

        const token = generateAccessToken({
          id: user[0].dataValues.id,
          email: user[0].dataValues.email,
          socialType: user[0].dataValues.socialType,
        });

        console.log("==================jwt==================", token);

        sendAccessToken(res, token);
      }
      // response.sendRedirect(request.getHeader("referer"));
      res.redirect(`${process.env.CLIENT_URI}`); //가입완료 후 화면
    } catch (error) {
      console.log("error");
      res.sendStatus(500);
    }
  },

  googleLogin: async (req, res) => {
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
    );
  },

  googleCallback: async (req, res) => {
    const code = req.query.code;

    try {
      console.log(code);
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
      );
      console.log("===============AccessToken Info================", result.data);
      const userInfo = await axios.get(
        // access token로 유저정보 요청
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
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
          email: userInfo.data.email,
          socialType: "google",
        },
        defaults: {
          email: userInfo.data.email, // 네이버에서 받아온 유저정보의 이메일
          name: "abc", //추후 randomNameAPI 사용하여 name 발급
          socialType: "google",
          deposit: 0,
          money: 0,
        },
      });
      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        socialType: user[0].dataValues.socialType,
      });

      console.log("==================jwt==================", token);

      sendAccessToken(res, token);

      // response.sendRedirect(request.getHeader("referer"));
      res.redirect(`${process.env.CLIENT_URI}`); //가입완료 후 화면
    } catch (error) {
      console.log("error");
      res.sendStatus(500);
    }
  },
};
