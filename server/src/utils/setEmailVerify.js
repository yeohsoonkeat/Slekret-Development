require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
})

const mailOptions = (email, link) => {
	return {
		from: process.env.EMAIL,
		to: email,
		subject: 'Sending Email using Node.js',
		text: 'That was easy!',
		html: '<a href="' + link + '">' + link + '</a>',
	}
}

const sendEmail = (email, link) => {
	transporter.sendMail(mailOptions(email, link), function(error, info) {
		if (error) {
			return false
		} else {
			console.log(info)
			return true
		}
	})
}

module.exports = sendEmail
