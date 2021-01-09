const { v4: uuidv4 } = require('uuid')
const addUser = require('../db/addUser')
const hashPassword = require('./hashPassword')
const { generateRefreshToken } = require('./jwt')

const addUserToDb = async (req, res, user) => {
	const userId = uuidv4()
	const { email, password, fullname, username } = user
	const hashpassword = await hashPassword(password)
	const { errors } = await addUser({
		id: userId,
		email,
		password: hashpassword,
		fullname,
		username,
	})

	if (errors) {
		res.status(400).json(errors[0])
	}
	const refreshToken = generateRefreshToken(userId)
	req.session.refreshToken = refreshToken
	res.redirect(process.env.CLIENT_URL + '/auth/verify')
}

module.exports = addUserToDb
