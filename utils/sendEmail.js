const nodemailer = require("nodemailer");
const { resetPasswordTemplate, addedToAPO } = require("./emailTemplates");

const sendEmail = async (to, settings) => {
	const { type = "resetPassword", resetLink } = settings;
	const subjectText =
		type === "resetPassword"
			? "You requested a password reset"
			: "You have been added to the APO";

	const htmlTemplate =
		type === "resetPassword" ? resetPasswordTemplate(resetLink) : addedToAPO();

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
			subject: subjectText,
			html: htmlTemplate,
		});
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = sendEmail;
