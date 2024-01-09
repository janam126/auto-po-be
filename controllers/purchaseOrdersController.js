const AppError = require("../utils/AppError");
const PurchaseOrders = require("../models/purchaseOrdersModel");
const {
	countNullFields,
	filterFromDate,
	filterUniqueEmails,
} = require("../utils/statisticsHelper");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

exports.getOrdersAndStatistics = async (_req, res, next) => {
	try {
		const response = await PurchaseOrders.find().populate({
			path: "History.UpdatedBy",
			select: "firstName lastName",
		});

		const documentToObject = JSON.parse(JSON.stringify(response));

		const statistics = (days) => ({
			email: filterFromDate(filterUniqueEmails(documentToObject), days),
			poCreated: filterFromDate(documentToObject, days),
			thanLastWeek: 69,
			missingInformation: filterFromDate(countNullFields(documentToObject), days),
		});

		res.status(200).json({
			status: "success",
			message: "Here are your orders and statistics",
			orderCount: response.length,
			data: {
				statistics: {
					past24h: statistics(1),
					past7days: statistics(7),
					past30days: statistics(30),
				},
				orders: response,
			},
		});
	} catch (error) {
		return next(new AppError(error, 403));
	}
};

exports.createPurchaseOrder = async (req, res, next) => {
	try {
		const purchaseOrder = await PurchaseOrders.create(req.body);

		res.status(200).json({
			status: "success",
			message: "Purchase order created",
			data: {
				purchaseOrder,
			},
		});
	} catch (error) {
		return next(new AppError(error, 403));
	}
};

exports.editPurchaseOrder = async (req, res, next) => {
	try {
		const OrderID = req.params.id;

		// Note:
		// If you make a request with History key value pair it will only Re-Sync the event,
		// that means it will only be updated, refreshed with all the existing properties
		// But if you make a request without the History key value pair it will update the event and it will
		// count as Updated, so new History object with info will be added to the History array

		const { History, ...updatedBody } = req.body;

		const updatedHistory = {
			MissingInformation: "none",
			Status: "updated",
			UpdatedBy: req.user._id,
		};

		const updateObject = History
			? { ...updatedBody }
			: {
					...updatedBody,
					$push: {
						History: updatedHistory,
					},
			  };

		const order = await PurchaseOrders.findOneAndUpdate({ OrderID }, updateObject, {
			new: true,
			runValidators: true,
		});

		if (!order) return next(new AppError("Purchase order doesn't exist", 400));

		res.status(200).json({
			status: "success",
			message: "Purchase order edited",
			data: order,
		});
	} catch (error) {
		return next(new AppError(error, 400));
	}
};

exports.downloadStatisticsPDF = async (_req, res, next) => {
	try {
		const pdfDoc = await PDFDocument.create();
		const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
		const page = pdfDoc.addPage();
		const { height } = page.getSize();

		const fontSize = 30;
		page.drawText("Random DPF text", {
			x: 50,
			y: height - 4 * fontSize,
			size: fontSize,
			font: timesRomanFont,
			color: rgb(0, 0, 0),
		});

		const pdfBytes = await pdfDoc.save();

		res.setHeader("Content-Type", "application/pdf");

		res.status(200).send(pdfBytes);
	} catch (error) {
		return next(new AppError(error, 400));
	}
};
