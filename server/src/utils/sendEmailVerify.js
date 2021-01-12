require('dotenv').config();
const nodemailer = require('nodemailer');
const generateVerifyLink = require('./generateVerifyLink');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const mailOptions = (email, link) => {
	return {
		from: process.env.EMAIL,
		to: email,
		subject: 'Sending Email using Node.js',
		text: 'That was easy!',
		html: '<a href="' + link + '">' + link + '</a>',
	};
};

const sendEmail = (reqBody, path) => {
	const link = generateVerifyLink(reqBody, path);
	const { email } = reqBody;

	transporter.sendMail(mailOptions(email, link), function(error) {
		if (error) {
			throw new Error('BROKEN');
		}
	});
};

module.exports = sendEmail;
