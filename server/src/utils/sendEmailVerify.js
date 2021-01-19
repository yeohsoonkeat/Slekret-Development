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

const sendEmail = (user, redirectPath) => {
	const link = generateVerifyLink(user, redirectPath);
	const { email } = user;

	return new Promise(function(resolve, reject) {
		transporter.sendMail(mailOptions(email, link), (err, info) => {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	});
};

module.exports = sendEmail;
