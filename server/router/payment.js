const express = require("express");
const paymentController = require("../controller/payment");
const isAuth = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", isAuth, paymentController.getUsersPaymentInfo); // user 결제 정보 조회
router.post("/credit", isAuth, paymentController.updateCard); // 카드 정보 등록
router.post("/account", isAuth, paymentController.updateAccount); // 인출 계좌 등록
router.post("/settlement", isAuth, paymentController.updateSettlement); // 정산일 등록

module.exports = router;
