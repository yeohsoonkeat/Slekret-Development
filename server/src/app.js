//app.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const sessions = require('express-session');
const authRoutes = require('./routes/authenticationRoutes/AuthRoutes');
const jwtUtils = require('./utils/jwt');
const isUserAuthenticated = require('./middleware/isUserAuthenticated');
const passport = require('passport');
const appConfig = require('./config/app.config');
const app = express();

// passport config
require('./config/passport.config');

app.use(express.json());

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
);

// middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: appConfig.clientURl,
		methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
		credentials: true,
	})
);

// public folder
app.use('/static', express.static(path.join(__dirname, 'assets')));

// router
app.use('/auth', authRoutes);

app.get('/token', isUserAuthenticated, (req, res) => {
	const refreshToken = req.session.refreshToken;
	const userId = jwtUtils.verifyToken(
		refreshToken,
		process.env.JWT_REFRESH_SECRET
	);

	const token = jwtUtils.hasuraJwtToken(userId);

	const user = req.session.user;

	return res.json({
		token,
		auth: true,
		user,
	});
});

module.exports = app;
