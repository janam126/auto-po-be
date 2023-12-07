const express = require("express");
const purchaseOrdersController = require("../controllers/purchaseOrdersController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, purchaseOrdersController.getOrdersAndStatistics);

module.exports = router;
