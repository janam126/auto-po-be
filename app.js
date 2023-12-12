const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const appController = require("./controllers/appController");
const userRouter = require("./routes/userRoutes");
const purchaseOrdersRouter = require("./routes/purchaseOrdersRoutes");

const app = express();

// Middlewares
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENVIRONMENT === "development") {
	app.use(morgan("dev"));
}

// App routes
app.use("/user", userRouter);
app.use("/purchaseOrders", purchaseOrdersRouter);

// Extra middlewares
app.get("/health", appController.healthController);
app.all("*", appController.routeNotFoundController);
app.use(appController.errorHandlingController);

module.exports = app;
