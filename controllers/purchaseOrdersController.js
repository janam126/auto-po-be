const AppError = require("../utils/AppError");
const PurchaseOrders = require("../models/purchaseOrdersModel");
const {
	countNullFields,
	filterFromDate,
	filterUniqueEmails,
} = require("../utils/statisticsHelper");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const { checkForMissingInfo } = require("../utils/checkForMissingInfo");
const sendEmail = require("../utils/sendEmail");

exports.getOrdersAndStatistics = async (req, res, next) => {
	const query = {};

	if (req.user.role !== "admin") {
		query.Company = req.user.company;
	}

	try {
		const response = await PurchaseOrders.find(query).populate({
			path: "History.UpdatedBy",
			select: "firstName lastName",
		});

		// TODO: IMprove this, it's ugly ASF
		const documentToObject = JSON.parse(JSON.stringify(response));

		const allStatisticsOption = {
			email: filterUniqueEmails(documentToObject).length,
			poCreated: documentToObject.length,
			thanLastWeek: "-",
			missingInformation: countNullFields(documentToObject).length,
		};

		const statistics = (days) => ({
			email: filterFromDate(filterUniqueEmails(documentToObject), days),
			poCreated: filterFromDate(documentToObject, days),
			thanLastWeek: "TBA",
			missingInformation: filterFromDate(countNullFields(documentToObject), days),
		});

		res.status(200).json({
			status: "success",
			message: "Here are your orders and statistics",
			orderCount: response.length,
			data: {
				statistics: {
					all: allStatisticsOption,
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
		const { settings } = req.user;
		const { emailWhenPoCreated, emailWhenPoHasMissingInfo } = settings;

		const nullFields = checkForMissingInfo(purchaseOrder);

		if (nullFields && purchaseOrder?.Email && emailWhenPoHasMissingInfo) {
			sendEmail({
				to: purchaseOrder.Email,
				type: "missingInfo",
				missingInfoData: nullFields,
			});
		}

		if (purchaseOrder?.Email && emailWhenPoCreated) {
			sendEmail({
				to: purchaseOrder.Email,
				type: "poCreated",
				data: purchaseOrder?.toObject(),
			});
		}

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

exports.getSinglePurchaseOrder = async (req, res, next) => {
	try {
		const OrderID = req.params.id;
		const purchaseOrder = await PurchaseOrders.findOne({ OrderID }).populate({
			path: "History.UpdatedBy",
			select: "firstName lastName",
		});

		if (!purchaseOrder)
			return next(new AppError(`Didn't find Purchase order with ID: ${OrderID}`, 400));

		res.status(200).json({
			status: "success",
			message: "Purchase order found",
			data: {
				purchaseOrder,
			},
		});
	} catch (error) {
		return next(new AppError(error, 400));
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
			UpdatedDate: new Date().toISOString(),
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
		}).populate({
			path: "History.UpdatedBy",
			select: "firstName lastName",
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
