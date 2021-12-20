const express = require("express");
const statementController = require("../controller/statement");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", isAuth, statementController.getPaymentPointWithdrawal); // 결제/적립/인출 내역 조회
router.post("/import-webhook", isAuth, statementController.completedPayment); // 아임포트 웹훅

module.exports = router;
