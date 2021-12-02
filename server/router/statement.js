const express = require("express");
const statementController = require("../controller/statement");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", isAuth, statementController.getPaymentPointWithdrawal); // 결제/적립/인출 내역 조회

module.exports = router;
