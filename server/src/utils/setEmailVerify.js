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

const sendEmail = (reqBody) => {
	const link = generateVerifyLink(reqBody);
	const { email } = reqBody;

	transporter.sendMail(mailOptions(email, link), function(error) {
		if (error) {
			throw new Error('BROKEN'); // Express will catch this on its own.
		}
	});
};

module.exports = sendEmail;
