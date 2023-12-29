const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const appController = require("./controllers/appController");
const userRouter = require("./routes/userRoutes");
const purchaseOrdersRouter = require("./routes/purchaseOrdersRoutes");

const app = express();

// Middlewares
// Cors
app.use(
	cors({
		origin: "*",
	})
);

// Rate Limiter
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, try again in an hour!",
});

app.use("/api", limiter);

// Security
// Set Security HTTP Headers
app.use(helmet());

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross site scripting) attacks
app.use(xss());

// Others
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENVIRONMENT === "development") {
	app.use(morgan("dev"));
}

// App routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/purchaseOrders", purchaseOrdersRouter);

// Extra middlewares
app.get("/api/v1/health", appController.healthController);
app.all("*", appController.routeNotFoundController);
app.use(appController.errorHandlingController);

module.exports = app;
