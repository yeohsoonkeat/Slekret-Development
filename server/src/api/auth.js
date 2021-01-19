const express = require('express');
const passport = require('passport');

const auth = express.Router();
const AuthController = require('../controller/AuthController');
const limiter = require('../middleware/limiter');
const speedLimiter = require('../middleware/speedLimiter');
const AuthValidator = require('../validator/AuthValidator');
const authValidator = new AuthValidator();
const authController = new AuthController();

const anHour = 60 * 60 * 1000;
const canRequest = 5;
const increaseOneSecond = 1000;

auth
	.route('/register')
	.post(
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authValidator.register(),
		authController.register
	);
auth.route('/verify-user').get(authController.verifyUser);

auth
	.route('/login')
	.post(
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authValidator.login(),
		authController.login
	);

auth.route('/logout').post(authController.logout);

auth
	.route('/reset-password')
	.post(
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
		authController.resetPassword
	);

auth.route('/verify-password').get(authController.verifyUserResetPassword);

auth
	.route('/setup-username')
	.post(
		speedLimiter(anHour, canRequest, increaseOneSecond),
		limiter(anHour, canRequest),
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
