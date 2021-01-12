require('dotenv').config();
const express = require('express');
const passport = require('passport');
const AuthController = require('./AuthController');

const authRouter = express.Router();

authRouter.route('/register').post(AuthController.userRegister);
authRouter.route('/verifyUser').get(AuthController.verifyUser);

authRouter.route('/login').post(AuthController.userLogin);
authRouter.route('/logout').post(AuthController.userLogout);

authRouter.route('/forgetPassword').post(AuthController.userForgetPassword);
authRouter.route('/verifyPassword').get(AuthController.verifyPassword);

//socail register
authRouter.route('/username').post(AuthController.usernameCreation);
authRouter.route('/github').get(passport.authenticate('github'));
authRouter.route('/github/callback').get(
	passport.authenticate('github', {
		failureRedirect: process.env.CLIENT_URL + '/auth',
	}),
	AuthController.authGithubCallback
);

module.exports = authRouter;
