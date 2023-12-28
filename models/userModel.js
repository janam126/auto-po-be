const mongoose = require("mongoose");
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Your first name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Your last name is required"],
	},
	email: {
		type: String,
		required: [true, "Your email is required"],
		unique: [true, "Email has to be unique"],
		validate: {
			validator: function (email) {
				return emailRegex.test(email);
			},
			message: "Please enter a valid email",
		},
	},
	photo: {
		type: String,
		default: "default.png",
		validate: {
			validator: function (photo) {
				if (photo === "" || photo.trim() === "") return false;
			},
			message: "Why did you add an empty photo?",
		},
	},
	role: {
		type: String,
		enum: ["user", "guide", "lead-guide", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minLength: [8, "At least 8 characters"],
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm a password"],
		validate: {
			validator: function (confirmedPassword) {
				return this.password === confirmedPassword;
			},
			message: "Passwords do not match!",
		},
	},
	lastLoginTime: {
		type: Date,
		default: undefined,
	},
	passwordChangedAt: Date,
	active: {
		type: Boolean,
		default: true,
	},
	settings: {
		EventName: {
			type: Boolean,
			default: true,
		},
		Section: {
			type: Boolean,
			default: true,
		},
		Row: {
			type: Boolean,
			default: true,
		},
		Qty: {
			type: Boolean,
			default: true,
		},
		Cost: {
			type: Boolean,
			default: true,
		},
		Vendor: {
			type: Boolean,
			default: true,
		},
		EventDate: {
			type: Boolean,
			default: true,
		},
		CreationDate: {
			type: Boolean,
			default: true,
		},
		Status: {
			type: Boolean,
			default: true,
		},
		Email: {
			type: Boolean,
			default: true,
		},
		Logs: {
			type: Boolean,
			default: true,
		},
		POSID: {
			type: Boolean,
			default: true,
		},
	},
});

userSchema.pre("save", function (next) {
	this.passwordConfirm = undefined;

	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
