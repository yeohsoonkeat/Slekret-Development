require('dotenv').config();
const express = require('express');
const passport = require('passport');
const AuthController = require('./AuthController');

const authRouter = express.Router();

authRouter.route('/register').post(AuthController.registerUser);

authRouter.route('/verify').get(AuthController.verifyUser);

authRouter.route('/login').post(AuthController.userLogin);

authRouter.route('/logout').post(AuthController.userLogout);

//socail register
authRouter.route('/github').get(passport.authenticate('github'));

authRouter.route('/github/callback').get(
	passport.authenticate('github', {
		failureRedirect: process.env.CLIENT_URL + '/auth',
	}),
	AuthController.authGithubCallback
);
authRouter.route('/username').post(AuthController.usernameCreation);

module.exports = authRouter;
