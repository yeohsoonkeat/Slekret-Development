require('dotenv').config()
const jwt = require('jsonwebtoken')
const generateVerifyLink = (user) => {
	const token = jwt.sign(user, process.env.TOKEN_LINK_VERIFY, {
		algorithm: 'HS256',
		expiresIn: '2m',
	})
	const link = process.env.APP_URL + `/auth/verify?token=${token}`
	return link
}

module.exports = generateVerifyLink
