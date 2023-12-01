const AppError = require("../utils/AppError");

exports.healthController = (_req, res, _next) => {
	res.status(200).json({ message: "App is healthy and going just fine." });
};

exports.routeNotFoundController = (req, _res, next) => {
	next(
		new AppError(
			`Route ${req.originalUrl} not found. Method: ${req.method}. Your IP: ${req.ip}`,
			400
		)
	);
};

exports.errorHandlingController = (err, _req, res, _next) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		// stack: err.stack,
	});
};
