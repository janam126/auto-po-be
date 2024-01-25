const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwtSigning = require("../utils/jwtSigning");
const getLocalTimestamp = require("../utils/getLocalTimestamp");
const sendEmail = require("../utils/sendEmail");
const jwtVerification = require("../utils/jwtVerification");

exports.addUser = async (req, res, next) => {
	try {
		// Filter the request body (security for malicious attempts)
		const { active, columnsettings, role, passwordChangedAt, ...filteredBody } = req.body;

		// Adding necessary fields to the filteredBody
		if (req.user.role === "admin") {
			if (!req.body.company) return next(new AppError("Please provide a company field", 400));
			filteredBody.role = "companyAdmin";
		} else {
			if (!req.user.company)
				return next(new AppError("Company Admin doesn't have a company", 400));
			filteredBody.company = req.user.company;
		}

		// Sending the email
		await sendEmail({
			to: req.body.email,
			type: "Welcome",
			invitedBy: `${req.user.firstName} ${req.user.lastName}`,
			company: filteredBody.company,
		});

		// Creating a user
		const createdUser = await User.create(filteredBody);

		res.status(200).json({
			status: "success",
			message: "New user added successfully",
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

		// Check if email or password are provided
		if (!email || !password)
			return next(new AppError("Please provide email and password", 400));

		// Find the user
		const user = await User.findOneAndUpdate(
			{ email },
			{ lastLoginTime: getLocalTimestamp() },
			{ new: true }
		);

		// Check if user exists (Same error msg as bellow for security purposes)
		if (!user) return next(new AppError("Incorrect email or password", 403));

		// Check if the password is correct or not (Same error msg as above for security purposes)
		if (user.password !== password)
			return next(new AppError("Incorrect email or password", 403));

		// So exactly the same as (!user || !user.active)
		// But i had to seperate those 2, because i want to send the same messges if user doesnt exist and if password is incorrect
		// And then after all of this to check if user is active or not
		if (!user?.active) return next(new AppError("User doesn't exist or is deactivated", 403));

		res.status(200).json({
			status: "success",
			message: "User found",
			token: jwtSigning.signToken(user._id),
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
		const decoded = jwtVerification(token);

		// 3 - See if user exists
		const user = await User.findById(decoded.id);
		if (!user) return next(new AppError("User doesn't exist", 400));

		// 4 - See if user is active or not
		if (!user.active) return next(new AppError("User is inactive", 400));

		// 5 - See if pw was changed in the meantime
		const tokenIssuedAt = new Date(decoded.iat * 1000).getTime();
		const passwordChangedAt = new Date(user.passwordChangedAt).getTime();

		if (passwordChangedAt > tokenIssuedAt) {
			return next(
				new AppError("Password has been changed, token invalidated, please login again", 400)
			);
		}

		// 6 - If everything is good, go next and append the user to req object
		req.user = user;
		next();
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.restrictTo = (...roles) => {
	// Check if user roles contain the (...roles)
	return async (req, _res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError("No persmission. Only ADMINS can access this resource", 403));
		}
		next();
	};
};

exports.forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;

		// Check if email is provided
		if (!email) return next(new AppError("Please provide an email", 400));

		// Find the user
		const user = await User.findOne({ email });

		// Check if user exists
		if (!user) return next(new AppError("User with this email doesn't exist", 400));

		// Generate token, url and send email
		const resetToken = jwtSigning.signEmail(user.email);
		const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
		await sendEmail({ to: user.email, resetLink: resetURL });

		res.status(200).json({
			status: "success",
			message: "Email succesfully sent",
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.resetPassword = async (req, res, next) => {
	try {
		const { token } = req.query;
		const { newPassword } = req.body;

		// Check if token or newPassword are provided
		if (!token || !newPassword)
			return next(new AppError("Token or newPassword not provided", 400));

		// Decode the token
		const decoded = jwtVerification(token, {
			error: "Your password reset session has expired. Please request a new password reset.",
			invalid: "Invalid or expired password reset link. Please request a new link.",
		});

		// Find the user
		const user = await User.findOne({ email: decoded.email });
		if (!user) return next(new AppError("User not found", 400));

		// Send error if user password is the same as the current password
		if (user.password === newPassword) {
			return next(new AppError("Cannot be a previously used password!", 400));
		}

		const updatedUser = await User.updateOne(
			{ email: decoded.email },
			{ password: newPassword },
			{ runValidators: true, new: true }
		);

		res.status(200).json({
			status: "success",
			message: "Password changed",
			user: updatedUser,
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};

exports.changePassword = async (req, res, next) => {
	try {
		const { currentPassword, password, passwordConfirm } = req.body;

		// Check if currentPassword password or passwordConfirm are provided
		if (!currentPassword || !password || !passwordConfirm)
			return next(new AppError("Current Password or Password Confirm not provided", 400));

		// Check if User Password is currentPassword
		if (req.user.password !== currentPassword) {
			return next(new AppError("Incorrect current password", 400));
		}

		// Check if User Password is the same as updated password
		if (req.user.password === password) {
			return next(new AppError("Cannot be a previously used password!", 400));
		}

		// Check if Password and Password COnfirm are the same
		if (password !== passwordConfirm) {
			return next(new AppError("Password and Password confirm do not match", 400));
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{ password, passwordChangedAt: new Date() },
			{ runValidators: true, new: true }
		);

		res.status(200).json({
			status: "success",
			message: "Password changed",
			user: updatedUser,
		});
	} catch (err) {
		next(new AppError(err.message, 400));
	}
};
