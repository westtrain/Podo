const { OTT } = require("../models");

module.exports = {
  getAllOTT: async (req, res) => {
    // 1. 모든 ott를 조회해서 클라이언트로 보내준다.
    try {
      const ottInfo = await OTT.findAll({
        raw: true,
      });
      console.log(ottInfo);
      return res.status(200).json({ data: ottInfo });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
