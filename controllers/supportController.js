const Support = require("../models/supportModel");
const AppError = require("../utils/AppError");

exports.submitSupportTicket = async (req, res, next) => {
	try {
		const support = await Support.create({ ...req.body, user: req.user._id });

		res.status(200).json({
			status: "success",
			message: "Your ticket is submitted",
			data: {
				support,
			},
		});
	} catch (error) {
		next(new AppError(error, 400));
	}
};
