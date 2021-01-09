require('dotenv').config()
const bcrypt = require('bcrypt')
const express = require('express')
const sendEmail = require('../utils/setEmailVerify')
const isUserEmailExist = require('../utils/isUserEmailExist')
const generateVerifyLink = require('../utils/generateVerifyLink')
const isUserUsernameExist = require('../utils/isUserUsernameExist')
const { verifyToken, generateRefreshToken } = require('../utils/jwt')
const addUserToDb = require('../utils/addUserToDb')
const getUserByEmail = require('../db/getUserByEmail')

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

authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body
	const { data, errors } = await getUserByEmail({ email })
	if (errors) {
		res.status(400).json(errors[0])
	}

	if (data.slekret_users.length !== 0) {
		const hashPassword = data.slekret_users[0].password
		const userid = data.slekret_users[0].id

		const isPasswordCorrect = await bcrypt.compare(password, hashPassword)
		if (isPasswordCorrect) {
			const refreshToken = generateRefreshToken(userid)
			req.session.refreshToken = refreshToken
			res.json({
				auth: true,
			})
		}
	} else {
		res.json({
			message: 'Unable to Login',
			auth: false,
		})
	}
})

authRouter.post('/logout', (req, res) => {
	req.session.destroy()
	res.json({
		auth: false,
	})
})

module.exports = authRouter
