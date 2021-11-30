const { User } = require("../models");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const { generateAccessToken, sendAccessToken } = require("./tokenfunction/index");

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
      // const result = await axios({
      //   //token
      //   method: "POST",
      //   url: "https://kauth.kakao.com/oauth/token",
      //   headers: {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      //   data: qs.stringify({
      //     grant_type: "authorization_code", //특정 스트링
      //     client_id: process.env.KAKAO_CLIENT_ID,
      //     client_secret: process.env.KAKAO_CLIENT_SECRET,
      //     redirect_uri: process.env.KAKAO_REDIRECT_URI,
      //     code: code, //결과값을 반환했다. 안됐다.
      //   }), //객체를 string 으로 변환
      // });
      console.log("===============Token Info================", result.data);
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
      //받아온 유저정보로 findOrCreate
      if (userInfo.data.kakao_account.email) {
        const user = await User.findOrCreate({
          where: {
            // id: userInfo.data.id,
            socialType: "kakao",
          },
          defaults: {
            // id: userInfo.data.id,
            email: userInfo.data.email, // 카카오에서 받아온 유저정보의 이메일
            name: "abc", //추후 randomNameAPI 사용하여 name 발급
            socialType: "kakao",
            deposit: 0,
            money: 0,
          },
        });
        console.log(user[0]);
      }
      const user = await User.findOrCreate({
        where: {
          // id: userInfo.data.id,
          socialType: "kakao",
        },
        defaults: {
          // id: userInfo.data.id,
          email: "@", // 카카오에서 받아온 유저정보의 이메일
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

      console.log("==================token==================", token);

      sendAccessToken(res, token);

      // response.sendRedirect(request.getHeader("referer"));
      res.redirect(`${process.env.CLIENT_URI}`); //가입완료 후 화면
    } catch (error) {
      console.log("error");
      res.sendStatus(500);
    }
  },
  googleLogin: async (req, res) => {
    res.redirect(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}/&state=naver`
    );
  },

  googleCallback: async (req, res) => {
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
};
