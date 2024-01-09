const express = require("express");
const purchaseOrdersController = require("../controllers/purchaseOrdersController");
const authController = require("../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(authController.protect, purchaseOrdersController.getOrdersAndStatistics)
	.post(authController.protect, purchaseOrdersController.createPurchaseOrder);

router.route("/pdf").get(purchaseOrdersController.downloadStatisticsPDF);

router.route("/:id").patch(authController.protect, purchaseOrdersController.editPurchaseOrder);

module.exports = router;
