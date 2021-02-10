const express = require('express');
const passport = require('passport');
const cors = require('cors');
const appConfig = require('../config/app.config');

const auth = express.Router();
const AuthController = require('../controller/AuthController');
const limiter = require('../middleware/limiter');
const speedLimiter = require('../middleware/speedLimiter');
const AuthValidator = require('../validator/AuthValidator');
const authValidator = new AuthValidator();
const authController = new AuthController();

const anHour = 60 * 60 * 1000;
const canRequest = 7;
const increaseOneSecond = 1000;

const whitelist = [appConfig.clientURl];
const corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
	credentials: true,
};

auth
	.route('/register')
	.post(
		cors(corsOptions),
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authValidator.register(),
		authController.register
	);
auth.route('/verify-user').get(cors(corsOptions), authController.verifyUser);

auth
	.route('/login')
	.post(
		cors(corsOptions),
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authValidator.login(),
		authController.login
	);

auth.route('/logout').post(cors(corsOptions), authController.logout);

auth
	.route('/reset-password')
	.post(
		cors(corsOptions),
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authValidator.resetPassword(),
		authController.resetPassword
	);

auth
	.route('/verify-password')
	.get(cors(corsOptions), authController.verifyUserResetPassword);

auth
	.route('/setup-username')
	.post(
		cors(corsOptions),
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authValidator.setupUsername(),
		authController.setUsername
	);

auth.route('/github').get(passport.authenticate('github'));

auth.route('/github/callback').get(
	passport.authenticate('github', {
		failureRedirect: process.env.CLIENT_URL + '/auth',
	}),
	authController.githubCallBack
);

module.exports = auth;
