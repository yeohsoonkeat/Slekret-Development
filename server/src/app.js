//app.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const sessions = require('express-session');
const api = require('./api');
const appConfig = require('./config/app.config');

const app = express();

// passport config
require('./config/passport.config');

app.set('trust proxy', 1);

app.enable('trust proxy');

app.use(helmet());

app.use(express.json());
// app.use(csrf());

// app.use(csrf({ cookie: true, httpOnly: true }));

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

// router

app.use('/api/v1', api);

app.use(function(err, req, res, next) {
	res.status(500).json({ message: 'something went wrong' });
});

module.exports = app;
