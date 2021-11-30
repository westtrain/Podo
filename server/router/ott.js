const express = require("express");
const ottController = require("../controller/ott");

const router = express.Router();

router.get("/", ottController.getAllOTT); // 모든 태그 조회

module.exports = router;
