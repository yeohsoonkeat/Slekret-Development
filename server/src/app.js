//app.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const csrf = require('csurf');
const helmet = require('helmet');
const passport = require('passport');
const sessions = require('express-session');
const appConfig = require('./config/app.config');
const api = require('./api');

const app = express();

// passport config
require('./config/passport.config');

app.set('trust proxy', 1);

app.enable('trust proxy');

app.use(helmet());

app.use(express.json());
// app.use(csrf());

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

var whitelist = [appConfig.clientURl];
var corsOptions = {
	origin: function(origin, callback) {
		console.log(origin);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
	credentials: true,
};

app.use(cors(corsOptions));

// router
app.use('/api/v1', api);

app.use(function(req, res, next) {
	// Expose variable to templates via locals
	res.locals.csrftoken = req.csrfToken();
	next();
});

app.use(function(err, req, res) {
	res.status(500).send('Something broke!');
});

module.exports = app;
