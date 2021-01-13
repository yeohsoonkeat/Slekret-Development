//app.js
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const sessions = require('express-session');
const authRoutes = require('./routes/authenticationRoutes/AuthRoutes');
const jwtUtils = require('./utils/jwt');
const isUserAuthenticated = require('./middleware/isUserAuthenticated');
const appConfig = require('./config/app.config');
const api = require('./api');
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
app.use('/api/v1', api);

app.get('/token', isUserAuthenticated, (req, res) => {
	const refreshToken = req.session.refreshToken;
	const userId = jwtUtils.verifyToken(
		refreshToken,
		process.env.JWT_REFRESH_SECRET
	);
	console.log(userId);

	const token = jwtUtils.hasuraJwtToken(userId);

	const user = req.session.user;

	return res.json({
		token,
		auth: true,
		user,
	});
});

module.exports = app;
