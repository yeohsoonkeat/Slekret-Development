require('dotenv').config()
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const hash_password = require('../utils/hash_password')
const getUserByEmail = require('../hasura_handler/get_user_by_email')
const getUserByUsername = require('../hasura_handler/get_user_by_username')
const sendEmail = require('../utils/setEmailVerify')
const generateVerifyLink = require('../utils/generateVerifyLink')
const { verifyToken, generateRefreshToken } = require('../utils/jwt')
const addUser = require('../hasura_handler/add_user')
const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
	const { username, email } = req.body

	if (!(await isUserEmailExist(email))) {
		if (!(await isUserUsernameExist(username))) {
			const link = generateVerifyLink(req.body)
			await sendEmail(email, link)
			res.json({
				verify: true,
			})
		} else {
			res.json({
				message: 'Username is already exist',
			})
		}
	} else {
		res.json({
			message: 'Email is already exist',
		})
	}
})

authRouter.get('/verify', async (req, res) => {
	const token = req.query.token
	const user = verifyToken(token, process.env.TOKEN_LINK_VERIFY)
	if (user) {
		addUserToDb(req, res, user)
	} else {
		res.redirect(process.env.CLIENT_URL + '/auth/expired')
	}
})

const addUserToDb = async (req, res, user) => {
	const userId = uuidv4()
	const { email, password, fullname, username } = user
	const hashpassword = await hash_password(password)
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

const isUserEmailExist = async (email) => {
	const { data } = await getUserByEmail({ email })
	if (data.slekret_users.length === 0) {
		return false
	} else {
		return true
	}
}

const isUserUsernameExist = async (username) => {
	const { data } = await getUserByUsername({ username })
	if (data.slekret_users.length === 0) {
		return false
	} else {
		return true
	}
}
module.exports = authRouter
