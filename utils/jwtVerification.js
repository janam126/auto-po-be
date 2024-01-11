const jwt = require("jsonwebtoken");

const jwtVerification = (token, settings) => {
	return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) {
			if (err.name === "TokenExpiredError")
				throw new Error(settings.error ?? "Your token has expired");
			if (err.name === "JsonWebTokenError")
				throw new Error(settings.invalid ?? "You provided an INVALID token");
			throw new Error(err.message);
		}
		if (decoded) return decoded;
	});
};

module.exports = jwtVerification;
