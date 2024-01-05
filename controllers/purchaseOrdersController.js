const AppError = require("../utils/AppError");
const PurchaseOrders = require("../models/purchaseOrdersModel");
const getRngFrom = require("../utils/getRngFrom");

exports.getOrdersAndStatistics = async (_req, res, next) => {
	try {
		const response = await PurchaseOrders.find().populate({
			path: "History.UpdatedBy",
			select: "firstName lastName",
		});

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
					past7days: statistics(),
					past30days: statistics(),
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
		const OrderID = req.params.id;

		const { History, ...updatedBody } = req.body;

		if (History)
			return next(
				new AppError("Remove History property, it will be added automatically", 400)
			);

		const updatedHistory = {
			MissingInformation: "none",
			Status: "updated",
			UpdatedBy: req.user._id,
		};

		const order = await PurchaseOrders.findOneAndUpdate(
			{ OrderID },
			{
				...updatedBody,
				$push: {
					History: updatedHistory,
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
