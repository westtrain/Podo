const express = require("express");
const partyController = require("../controller/party");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", isAuth, partyController.getUsersPaymentInfo); // user 결제 정보 조회
router.get("/list", isAuth, partyController.getPaymentPointWithdrawal); // 결제/적립/인출 내역 조회
router.patch("/credit", isAuth, partyController.changeCard); // 카드 변경
router.patch("/account", isAuth, partyController.getFilteredParties); // 인출계좌 변경
router.patch("/ott", isAuth, partyController.updateOTTLoginInfo); // OTT 로그인 정보 변경
router.patch("/memberNum", isAuth, partyController.changeMemberNum); // 파티 인원 수 변경
router.patch("/join", isAuth, partyController.joinParty); // 파티 가입
router.delete("/", isAuth, partyController.leaveParty); // 파티 탈퇴

module.exports = router;
