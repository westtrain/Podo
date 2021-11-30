const express = require("express");
const ottController = require("../controller/ott");

const router = express.Router();

router.get("/", ottController.getAllOTT); // 모든 OTT 조회

module.exports = router;
