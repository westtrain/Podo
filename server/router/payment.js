const express = require("express");
const paymentController = require("../controller/payment");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", isAuth, paymentController.getUsersPaymentInfo); // user 결제 정보 조회
router.get("/list", isAuth, paymentController.getPaymentPointWithdrawal); // 결제/적립/인출 내역 조회
router.patch("/credit", isAuth, paymentController.changeCard); // 카드 변경
router.patch("/account", isAuth, paymentController.changeAccount); // 인출 계좌 변경
router.patch("/ott", isAuth, paymentController.changeSettlement); // 정산일 변경
router.post("/memberNum", isAuth, paymentController.enrollCard); // 카드 정보 등록
router.post("/join", isAuth, paymentController.enrollAccount); // 인출 계좌 등록
router.post("/", isAuth, paymentController.enrollSettlement); // 정산일 등록

module.exports = router;
