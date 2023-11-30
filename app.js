const express = require("express");
const morgan = require("morgan");
const appController = require("./controllers/appController");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENVIRONMENT === "development") {
	app.use(morgan("dev"));
}

// App routes
app.use("/user", userRouter);

// Extra middlewares
app.get("/health", appController.healthController);
app.all("*", appController.routeNotFoundController);
app.use(appController.errorHandlingController);

module.exports = app;
