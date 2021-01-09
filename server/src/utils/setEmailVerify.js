const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: false,
	auth: {
		user: 'codeorge@gmail.com',
		pass: '0963817848',
	},
})

const mailOptions = (email, link) => {
	return {
		from: 'codeorge@gmail.com',
		to: email,
		subject: 'Sending Email using Node.js',
		text: 'That was easy!',
		html: '<a href="' + link + '">' + link + '</a>',
	}
}

const sendEmail = (email, link) => {
	transporter.sendMail(mailOptions(email, link), function(error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

module.exports = sendEmail
