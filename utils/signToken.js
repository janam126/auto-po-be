const jwt = require("jsonwebtoken");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXP_TIME,
	});
};

exports.signEmail = (email) => {
	return jwt.verify({ email }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXP_TIME,
	});
};

module.exports = signToken;
