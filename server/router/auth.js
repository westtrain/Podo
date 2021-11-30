const express = require("express");
const authController = require("../controller/auth");
// const isAuth = require("../middleware/verifyToken");
// const { uploads } = require("../middleware/upload");

const router = express.Router();

// router.post("/login", authController.login); // login API
// router.post("/logout", isAuth, authController.logout); // logout API
// router.post("/signup", authController.signup); // singup API
// router.post("/name", authController.validateName); // vaildate a name
router.get("/naver", authController.naverLogin);
router.get("/naverCallback", authController.naverCallback);

module.exports = router;
