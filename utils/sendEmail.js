const nodemailer = require("nodemailer");
const resetPasswordTemplate = require("./resetPasswordTemplate");

const sendEmail = async (to, resetLink) => {
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
			subject: "You requested a password reset",
			html: resetPasswordTemplate(resetLink),
		});
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = sendEmail;
