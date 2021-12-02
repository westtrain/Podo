const express = require("express");
const partyController = require("../controller/party");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/user", isAuth, partyController.getUsersParty); // user가 가입한 모든 파티 리스트 조회
router.get("/filtered", partyController.getFilteredParties); // 날짜별 파티 조회
router.get("/:id", partyController.getParty); // 파티 상세 정보 조회
router.get("/", partyController.getAllParties); // 전체 파티 조회
router.post("/", isAuth, partyController.createParty); // 파티 만들기
router.patch("/ott", isAuth, partyController.updateOTTLoginInfo); // OTT 로그인 정보 변경
router.patch("/memberNum", isAuth, partyController.changeMemberNum); // 파티 인원 수 변경
router.patch("/join", isAuth, partyController.joinParty); // 파티 가입
router.delete("/", isAuth, partyController.leaveParty); // 파티 탈퇴

module.exports = router;
