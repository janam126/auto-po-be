const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const mongoose = require("mongoose");
const app = require("./app");

console.log("Environment:", process.env.NODE_ENVIRONMENT || "Environment not set up");

const DB = process.env.MONGO_DB_CONNECTION_STRING.replace(
	"<username>",
	process.env.MONGO_DB_USERNAME
).replace("<password>", process.env.MONGO_DB_PASSWORD);

mongoose.connect(DB, {}).then((_connection) => console.log("Connected to omni-app MongoDB"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
