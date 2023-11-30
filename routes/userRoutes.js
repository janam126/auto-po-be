const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(authController.protect, authController.restrictTo("admin"), userController.getAllUsers);
router.route("/me").get(authController.protect, userController.getMe);
router.route("/login").post(authController.login);
router.route("/signup").post(authController.singup);

module.exports = router;
