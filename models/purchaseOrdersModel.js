const mongoose = require("mongoose");

const purchaseOrdersSchema = new mongoose.Schema({
	EventName: {
		type: String,
		default: null,
	},
	Company: {
		type: String,
	},
	Venue: {
		type: String,
		default: null,
	},
	POSID: {
		type: String,
		default: null,
	},
	Section: {
		type: String,
		default: null,
	},
	Row: {
		type: String,
		default: null,
	},
	Qty: {
		type: Number,
		default: null,
	},
	Seats: {
		type: [Number],
		default: null,
		set: function (value) {
			if (Array.isArray(value) && value.length === 0) {
				return null;
			}
			return value;
		},
	},
	Cost: {
		type: Number,
		default: null,
	},
	Marketplace: {
		type: String,
		default: null,
		enum: ["Seat Geek", "StubHub", "Ticketmaster"],
	},
	EventDate: {
		type: Date,
		default: null,
	},
	CreationDate: {
		type: Date,
		default: Date.now,
	},
	Status: {
		type: String,
		enum: ["updated", "failed", "pending"],
		default: null,
	},
	Email: {
		type: String,
		default: null,
	},
	OrderID: {
		type: Number,
		default: null,
	},
	DeliveryMethod: {
		type: String,
		default: null,
	},
	IsAttachment: {
		type: Boolean,
		default: null,
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
		},
	},
	IsDeliveryDelay: {
		type: Boolean,
		default: null,
	},
	CreditCard: {
		type: String,
		default: null,
	},
	History: {
		type: [
			{
				UpdatedDate: {
					type: Date,
					default: null,
				},
				MissingInformation: {
					type: String,
					default: null,
				},
				Status: {
					type: String,
					enum: ["updated", "failed", "pending"],
					default: null,
				},
				UpdatedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					default: null,
				},
			},
		],
		default: null,
		// set: function (value) {
		// 	if (Array.isArray(value) && value.length === 0) {
		// 		return null;
		// 	}
		// 	return value;
		// },
	},
});

const PurchaseOrders = mongoose.model("PurchaseOrder", purchaseOrdersSchema, "purchaseOrders");

module.exports = PurchaseOrders;
