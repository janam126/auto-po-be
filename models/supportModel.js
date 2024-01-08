const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
		minlength: [2, "Title must be at least 2 characters"],
		maxlength: [40, "Can't be more than 40 characters"],
	},
	info: {
		type: String,
		required: [true, "Additional info is required"],
		minlength: [2, "Additional info must be at least 2 characters"],
		maxlength: [900, "Can't be more than 900 characters"],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "UserId is required info is required"],
	},
});

const Support = mongoose.model("Support", supportSchema, "supportTickets");

module.exports = Support;
