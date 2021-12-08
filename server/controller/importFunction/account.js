const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const generateImportToken = async () => {
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
    console.log(
      "===============Token Info================",
      result.data.response
    );
    const token = result.data.response.access_token;
    return result.status === 200 ? token : "error";
  } catch (error) {
    console.log("generateImportToken error");
    return -1;
  }
};

const checkAccountName = async (bank_code, bank_num, token) => {
  try {
    const name = await axios.get(
      // access token 요청해서 계좌 조회
      `https://api.iamport.kr/vbanks/holder?bank_code=${bank_code}&bank_num=${bank_num}&_token=${token}`
    );

    console.log(
      "===============Account Name================",
      name.data.response
    );
    const bank_holder = name.data.response;
    return bank_holder;
  } catch (error) {
    console.log("checkAccount error");
    return -1;
  }
};

module.exports = { generateImportToken, checkAccountName };