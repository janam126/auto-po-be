const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const signToken = require("../utils/signToken");
const jwt = require("jsonwebtoken");
const util = require("util");
const getLocalTimestamp = require("../utils/getLocalTimestamp");

exports.singup = async (req, res, next) => {
	try {
		const { active, settings, role, points, passwordChangedAt, ...filteredBody } = req.body;

		const createdUser = await User.create(filteredBody);

		res.status(200).json({
			status: "success",
			message: "User created",
			data: {
				user: createdUser,
			},
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			return next(new AppError("Please provide email and password", 400));

		const user = await User.findOneAndUpdate(
			{ email },
			{ lastLoginTime: getLocalTimestamp() },
			{ new: true }
		);

		// This actually means iven if user doesnt exist it will return undefined
		// So exactly the same as (!user || !user.active)
		if (!user?.active) return next(new AppError("User doesn't exist or is deactivated", 403));

		if (user.password !== password)
			return next(new AppError("Incorrect username or password", 403));

		res.status(200).json({
			status: "success",
			message: "User found",
			token: signToken(user._id),
			data: {
				user,
			},
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.protect = async (req, _res, next) => {
	try {
		// 1 - Check if token exists and if it starts with bearer
		const headerToken = req.headers.authorization;
		let token;

		if (headerToken?.startsWith("Bearer")) token = headerToken.split(" ")[1];
		if (!token) return next(new AppError("Token not provided.", 400));

		// 2 - Decode token and see if valid/expired
		let decoded;
		try {
			let response = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
			decoded = response;
		} catch (error) {
			return next(new AppError(error.message, 400));
		}

		// 3 - See if user exists
		const user = await User.findById(decoded.id);
		if (!user) return next(new AppError("User doesn't exist", 400));

		// 4 - See if user is active or not
		if (!user.active) return next(new AppError("User is inactive", 400));

		// 5 - See if pw was changed in the meantime
		// Will implement later

		// 6 - If everyrginf is good, go next and append the user to req object
		req.user = user;
		next();
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.restrictTo = (...roles) => {
	return async (req, _res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError("No persmission. Only ADMINS can access all users route", 403));
		}
		next();
	};
};
