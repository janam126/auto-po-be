const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getAllUsers = async (_req, res, next) => {
	try {
		const users = await User.find({});

		res.status(200).json({
			status: "success",
			message: "Users found",
			results: users.length,
			data: {
				users,
			},
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.getMe = async (req, res, next) => {
	try {
		res.status(200).json({
			status: "success",
			message: "Here is your data",
			data: {
				user: req.user,
			},
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.updateMe = async (req, res, next) => {
	try {
		const { active, role, passwordChangedAt, ...filteredBody } = req.body;
		const newUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true });

		res.status(200).json({
			status: "success",
			message: "Settings saved successfully",
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};
