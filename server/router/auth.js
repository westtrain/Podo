const express = require("express");
const authController = require("../controller/auth");
// const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/naver", authController.naverLogin);
router.get("/naverCallback", authController.naverCallback);
router.get("/kakao", authController.kakaoLogin);
router.get("/kakaoCallback", authController.kakaoCallback);
router.get("/google", authController.googleLogin);
router.get("/googleCallback", authController.googleCallback);

module.exports = router;
