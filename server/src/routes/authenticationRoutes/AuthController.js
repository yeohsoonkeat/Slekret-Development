require('dotenv').config()
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const createUser = require('../../db/createUser')
const getUserByEmail = require('../../db/getUserByEmail')
const hashPassword = require('../../utils/hashPassword')
const isUserEmailExist = require('../../utils/isUserEmailExist')
const isUserUsernameExist = require('../../utils/isUserUsernameExist')
const jwtUtils = require('../../utils/jwt')
const sendEmail = require('../../utils/setEmailVerify')

module.exports = {
	// POST register user
	registerUser: async (req, res) => {
		const { username, email } = req.body

		if (req.session.verifyCount) {
			req.session.verifyCount = parseInt(req.session.verifyCount) + 1
		} else {
			req.session.verifyCount = 1
		}

		// thrird attemp
		if (parseInt(req.session.verifyCount) > 2) {
			req.session.destroy()
			return res.json({
				verify: false,
			})
		}
		// second attempt
		if (parseInt(req.session.verifyCount) === 2) {
			try {
				await sendEmail(req.body, res)
				return res.json({
					message: 'Email have been to your inbox',
				})
			} catch (er) {
				return res.json({
					message: 'can not send Email',
				})
			}
		}
		// first attempt
		if (!(await isUserEmailExist(email))) {
			if (!(await isUserUsernameExist(username))) {
				try {
					await sendEmail(req.body, res)
					res.json({
						verify: true,
					})
				} catch (er) {
					res.json({
						message: 'can not send Email',
					})
				}
			} else {
				return res.json({
					message: 'Username is already exist',
				})
			}
		} else {
			return res.json({
				message: 'Email is already exist',
			})
		}
	},
	//GET verify user
	verifyUser: async (req, res) => {
		const token = req.query.token
		const user = jwtUtils.verifyToken(token, process.env.TOKEN_LINK_VERIFY)

		if (user) {
			const userId = uuidv4()
			const { email, password, fullname, username } = user
			const hashpassword = await hashPassword(password)

			const { errors } = await createUser({
				id: userId,
				email,
				password: hashpassword,
				fullname,
				username,
			})
			if (errors) {
				res.status(400).json(errors[0])
			}

			const refreshToken = jwtUtils.generateRefreshToken(userId)
			req.session.refreshToken = refreshToken

			res.redirect(process.env.CLIENT_URL + '/auth/verify')
		} else {
			res.redirect(process.env.CLIENT_URL + '/auth/expired')
		}
	},
	//POST user login

	userLogin: async (req, res) => {
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
				const refreshToken = jwtUtils.generateRefreshToken(userid)
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
	},
	//POST user logout
	userLogout: async (req, res) => {
		req.session.destroy()
		res.json({
			auth: false,
		})
	},
}
