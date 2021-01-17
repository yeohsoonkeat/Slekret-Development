const express = require('express');
const passport = require('passport');

const auth = express.Router();
const AuthController = require('../controller/AuthController');

const authController = new AuthController();

auth.route('/register').post(authController.register);
auth.route('/verify-user').post(authController.verifyUser);

auth.route('/login').post(authController.login);
auth.route('/logout').post(authController.logout);

auth.route('/forget-password').post(authController.forgetPassword);
auth.route('/verifyPassword').post(authController.verifyPassword);

auth.route('/set-username').post(authController.setUsername);
auth.route('/github').get(passport.authenticate('github'));

auth.route('/github/callback').get(
	passport.authenticate('github', {
		failureRedirect: process.env.CLIENT_URL + '/auth',
	}),
	authController.githubCallBack
);

module.exports = auth;
