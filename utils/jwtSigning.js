const jwt = require("jsonwebtoken");

exports.signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXP_TIME,
	});
};

exports.signEmail = (email) => {
	return jwt.sign({ email }, process.env.JWT_SECRET, {
		expiresIn: "15m",
	});
};
