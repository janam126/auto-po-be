const AppError = require("../utils/AppError");
const PurchaseOrders = require("../models/purchaseOrdersModel");
const getRngFrom = require("../utils/getRngFrom");

exports.getOrdersAndStatistics = async (_req, res, next) => {
	try {
		const response = await PurchaseOrders.find({});

		const statistics = () => ({
			email: getRngFrom(100, 900),
			poCreated: getRngFrom(60000, 400000),
			thanLastWeek: getRngFrom(10, 95),
			missingInformation: getRngFrom(2, 30),
		});

		res.status(200).json({
			status: "success",
			message: "Here are your orders and statistics",
			orderCount: response.length,
			data: {
				statistics: {
					past24h: statistics(),
					past2days: statistics(),
					past7days: statistics(),
				},
				orders: response,
			},
		});
	} catch (error) {
		return next(new AppError(error, 403));
	}
};

exports.createPurchaseOrder = async (req, res, next) => {
	try {
		const purchaseOrder = await PurchaseOrders.create(req.body);

		res.status(200).json({
			status: "success",
			message: "Purchase order created",
			data: {
				purchaseOrder,
			},
		});
	} catch (error) {
		return next(new AppError(error, 403));
	}
};

exports.editPurchaseOrder = async (req, res, next) => {
	try {
		const orderId = req.params.id;

		const { History, ...updatedBody } = req.body;

		if (History.UpdatedDate)
			return next(
				new AppError("Remove UpdatedDate property, it will be added automatically", 400)
			);

		const order = await PurchaseOrders.findByIdAndUpdate(
			orderId,
			{
				...updatedBody,
				$push: {
					History,
				},
			},
			{ new: true, runValidators: true }
		);

		if (!order) return next(new AppError("Purchase order doesn't exist", 400));

		res.status(200).json({
			status: "success",
			message: "Purchase order edited",
			data: order,
		});
	} catch (error) {
		return next(new AppError(error, 400));
	}
};
