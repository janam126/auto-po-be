const AppError = require("../utils/AppError");
const purchaseOrders = require("../data/purchaseOrders");
const getRngFrom = require("../utils/getRngFrom");

exports.getOrdersAndStatistics = async (_req, res, next) => {
	try {
		const response = await new Promise((res, _rej) => {
			setTimeout(() => {
				return res(purchaseOrders);
			}, 1000);
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
		return next(new AppError(error));
	}
};
