//app.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const sessions = require('express-session')
const authRouter = require('./router/auth')
const { verifyToken, hasura_jwt_token } = require('./utils/jwt')
const isUserAuthenticated = require('./middleware/isUserAuthenticated')

app.use(express.json())

app.use(
	sessions({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000 * 3,
		},
	})
)

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
		credentials: true,
	})
)

// router
app.use('/auth', authRouter)

app.get('/token', isUserAuthenticated, (req, res) => {
	const refreshToken = req.session.refreshToken
	const userId = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET)
	console.log(userId, '=====')
	if (!userId) {
		res.json({ auth: false })
	}
	const token = hasura_jwt_token(userId)
	res.json({
		token,
		auth: true,
	})
})

module.exports = app
