const nodemailer = require("nodemailer");
const {
	resetPasswordTemplate,
	addedToAPO,
	missingInfoMail,
	poCreatedMail,
} = require("./emailTemplates");

exports.mailTypes = Object.freeze({
	welcome: "welcome",
	resetPassword: "resetPassword",
	missingInfo: "missingInfo",
	poCreated: "poCreated",
});

const sendEmail = async ({
	to,
	type = "resetPassword",
	invitedBy,
	company,
	resetLink,
	missingInfoData,
	data,
}) => {
	const subjectText = {
		welcome: "You have been invited to the APO",
		resetPassword: "You requested a password reset",
		missingInfo: "Your purchase order has missing information",
		poCreated: "You successfully created a purchase order",
	};

	const htmlTemplate = {
		welcome: () => addedToAPO({ invitedBy, company }),
		resetPassword: () => resetPasswordTemplate({ resetLink }),
		missingInfo: () => missingInfoMail({ missingInfo: missingInfoData, data }),
		poCreated: () => poCreatedMail({ data }),
	};

	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			port: 465,
			auth: {
				user: process.env.NODE_MAILER_USER,
				pass: process.env.NODE_MAILER_PASS,
			},
		});

		await transporter.sendMail({
			from: "Auto PO - StageFront <auto_po_mail>",
			to,
			subject: subjectText[type],
			html: htmlTemplate[type](),
		});

		return {
			message: "success",
			err: null,
		};
	} catch (err) {
		return {
			message: "fail",
			err: err,
		};
	}
};

module.exports = sendEmail;
