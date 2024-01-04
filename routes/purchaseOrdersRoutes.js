const express = require("express");
const purchaseOrdersController = require("../controllers/purchaseOrdersController");
const authController = require("../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(authController.protect, purchaseOrdersController.getOrdersAndStatistics)
	.post(authController.protect, purchaseOrdersController.createPurchaseOrder);

module.exports = router;
