const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
	order: String,
	url: String,
	points: Number,
	name: String,
	price: Number,
	descripton: String,
});

const Bundle = mongoose.model("Bundle", shopSchema);

module.exports = Bundle;
