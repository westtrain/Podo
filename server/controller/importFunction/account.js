const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

module.exports = {
  checkAccount: async (req, res) => {
    try {
      const result = await axios({
        // access token 요청
        method: "post",
        url: "https://api.iamport.kr/users/getToken",
        data: {
          imp_key: process.env.IMP_KEY,
          imp_secret: process.env.IMP_SECRET,
        },
      });

      console.log("===============Token Info================", result.data.response);

      const token = result.data.response.access_token;
      const { bank_code, bank_num } = req.query;

      const name = await axios.get(
        // access token 요청해서 계좌 조회
        `https://api.iamport.kr/vbanks/holder?bank_code=${bank_code}&bank_num=${bank_num}&_token=${token}`
      );

      console.log("===============Account Name================", name.data.response.bank_holder);
      res.json({ message: name.data.response });
    } catch (error) {
      console.log("error");
      res.sendStatus(500);
    }
  },
};
