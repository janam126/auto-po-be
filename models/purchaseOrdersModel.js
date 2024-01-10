const mongoose = require("mongoose");

const purchaseOrdersSchema = new mongoose.Schema({
	EventName: {
		type: String,
		required: true,
	},
	Venue: {
		type: String,
		required: true,
	},
	POSID: {
		type: String,
		required: true,
	},
	Section: {
		type: String,
		required: true,
	},
	Row: {
		type: String,
		required: true,
	},
	Qty: {
		type: Number,
		required: true,
	},
	Seats: {
		type: [Number],
		required: true,
		validate: {
			validator: function (array) {
				return array.length > 0; // Check that the array is not empty
			},
			message: "Seats array must not be empty",
		},
	},
	Cost: {
		type: Number,
		required: true,
	},
	Marketplace: {
		type: String,
		required: true,
		enum: ["Seat Geek", "StubHub", "Ticketmaster"],
	},
	EventDate: {
		type: Date,
		required: true,
	},
	CreationDate: {
		type: Date,
		default: Date.now,
	},
	Status: {
		type: String,
		required: true,
		enum: ["updated", "failed", "pending"],
	},
	Email: {
		type: String,
		required: true,
	},
	OrderID: {
		type: Number,
		required: true,
	},
	DeliveryMethod: {
		type: String,
		required: true,
	},
	IsAttachment: {
		type: Boolean,
		required: true,
	},
	Attachment: {
		fileName: {
			type: String,
		},
		fileSize: {
			type: String,
		},
		filePath: {
			type: String,
		},
		uploadDate: {
			type: Date,
			default: Date.now,
		},
	},
	IsDeliveryDelay: {
		type: Boolean,
		required: true,
	},
	CreditCard: {
		type: String,
		required: true,
	},
	History: [
		{
			UpdatedDate: {
				type: Date,
				default: Date.now,
			},
			MissingInformation: {
				type: String,
			},
			Status: {
				type: String,
				required: true,
				enum: ["updated", "failed", "pending"],
			},
			UpdatedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		},
	],
});

const PurchaseOrders = mongoose.model("PurchaseOrder", purchaseOrdersSchema, "purchaseOrders");

module.exports = PurchaseOrders;
