const express = require("express");
const authController = require("../controllers/authController");
const supportController = require("../controllers/supportController");

const router = express.Router();

router.route("/").post(authController.protect, supportController.submitSupportTicket);

module.exports = router;
