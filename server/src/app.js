//app.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sessions = require('express-session')
const authRoutes = require('./routes/authenticationRoutes/AuthRoutes')
const jwtUtils = require('./utils/jwt')
const isUserAuthenticated = require('./middleware/isUserAuthenticated')
const app = express()

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
app.use('/auth', authRoutes)

app.get('/token', isUserAuthenticated, (req, res) => {
	const refreshToken = req.session.refreshToken
	const userId = jwtUtils.verifyToken(
		refreshToken,
		process.env.JWT_REFRESH_SECRET
	)
	if (!userId) {
		res.json({ auth: false })
	}
	const token = jwtUtils.hasuraJwtToken(userId)
	res.json({
		token,
		auth: true,
	})
})

app.get('/', (req, res) => {
	res.redirect(process.env.CLIENT_URL)
})

module.exports = app
