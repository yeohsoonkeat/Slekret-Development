const express = require('express');
const passport = require('passport');

const auth = express.Router();
const AuthController = require('../controller/AuthController');
const limiter = require('../middleware/limiter');
const speedLimiter = require('../middleware/speedLimiter');

const authController = new AuthController();

auth
	.route('/register')
	.post(
		speedLimiter(60 * 60 * 1000, 5, 1000),
		limiter(60 * 60 * 1000, 5),
		authController.register
	);
auth.route('/verify-user').get(authController.verifyUser);

auth
	.route('/login')
	.post(
		speedLimiter(60 * 60 * 1000, 5, 1000),
		limiter(60 * 60 * 1000, 5),
		authController.login
	);
auth.route('/logout').post(authController.logout);

auth
	.route('/forget-password')
	.post(
		speedLimiter(60 * 60 * 1000, 5, 1000),
		limiter(60 * 60 * 1000, 5),
		authController.forgetPassword
	);
auth.route('/verifyPassword').post(authController.verifyPassword);

auth
	.route('/set-username')
	.post(
		speedLimiter(60 * 60 * 1000, 5, 1000),
		limiter(60 * 60 * 1000, 5),
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
