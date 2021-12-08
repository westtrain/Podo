const express = require("express");
const paymentController = require("../controller/payment");
const isAuth = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", isAuth, paymentController.getUsersPaymentInfo); // user 결제 정보 조회
router.patch("/credit", isAuth, paymentController.changeCard); // 카드 변경
router.patch("/account", isAuth, paymentController.changeAccount); // 인출 계좌 변경
router.patch("/settlement", isAuth, paymentController.changeSettlement); // 정산일 변경
router.post("/credit", isAuth, paymentController.enrollCard); // 카드 정보 등록
router.post("/account", isAuth, paymentController.enrollAccount); // 인출 계좌 등록
router.post("/settlement", isAuth, paymentController.enrollSettlement); // 정산일 등록

module.exports = router;
