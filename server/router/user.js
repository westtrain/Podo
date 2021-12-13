const express = require("express");
const userController = require("../controller/user");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", isAuth, userController.getUser); // user 정보 조회
router.patch("/image/:id", isAuth, userController.updateProfileImage); //유저 이미지 변경
router.patch("/money", isAuth, userController.updateMoney); // 포도머니 조회
router.delete("/", isAuth, userController.deleteUser); // 탈퇴

module.exports = router;
