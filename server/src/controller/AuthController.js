require('dotenv').config();
const { validationResult } = require('express-validator');
const isUserEmailExist = require('../utils/isUserEmailExist');
const isUserUsernameExist = require('../utils/isUserUsernameExist');
const sendEmail = require('../utils/sendEmailVerify');
const jwtUtils = require('../utils/jwt');
const appConfig = require('../config/app.config');
const setUserSession = require('../utils/setUserSession');
const UserService = require('../service/UserService');
const comparePassword = require('../utils/comparePassword');
const hashPassword = require('../utils/hashPassword');
const updateUserPassword = require('../db/updateUserPassword');
const getUserByEmail = require('../db/getUserByEmail');

const userService = new UserService();

class AuthController {
	async register(req, res, next) {
		try {
			const error = validationResult(req);
			if (error.errors.length > 0) {
				return res.json({
					message: 'Unable to create user',
				});
			}

			const user = req.body;

			if (await isUserEmailExist(user.email)) {
				return res.json({
					message: 'Email is alredy exist',
				});
			}

			if (await isUserUsernameExist(user.username)) {
				return res.json({
					message: 'Username is already exist',
				});
			}

			await sendEmail(user, '/verify-user').catch(() => {
				return res.json({ message: 'Can not send message', emailSent: false });
			});

			return res.json({
				emailSent: true,
			});
		} catch (err) {
			next(err);
		}
	}

	async verifyUser(req, res) {
		const token = req.query.token;

		const user = jwtUtils.verifyToken(token, process.env.TOKEN_LINK_VERIFY);

		if (!user) {
			return res.redirect(appConfig.clientURl + '/auth/expired');
		}

		try {
			// check if user is using the same generate link
			const userByEmail = await userService.getUserByEmail(user.email);

			if (userByEmail.length !== 0) {
				const userObj = userByEmail[0];
				const userSession = {
					id: userObj.id,
					username: userObj.username,
					avatar_src: userObj.avatar_src,
				};
				setUserSession(userSession, req);
				return res.redirect(appConfig.clientURl);
			}

			const result = await userService.createUser(user);

			setUserSession(result, req);
			return res.redirect(appConfig.clientURl);
		} catch (err) {
			return res.status(500).json({ message: 'Can not create user' });
		}
	}

	async login(req, res, next) {
		const error = validationResult(req);
		if (error.errors.length > 0) {
			return res.json({
				message: 'Unable to login',
				auth: false,
			});
		}
		const user = req.body;

		try {
			const result = await userService.getUserByEmail(user.email);
			if (result.length === 0) {
				return res.json({ message: 'Unable to login', auth: false });
			}
			const userObj = result[0];

			const isPasswordCorrect = await comparePassword(
				user.password,
				userObj.password
			);

			if (!isPasswordCorrect) {
				return res.json({ message: 'Unable to login', auth: false });
			}

			const userSession = {
				id: userObj.id,
				username: userObj.username,
				avatar_src: userObj.avatar_src,
			};

			setUserSession(userSession, req);

			return res.json({
				auth: true,
				user: userSession,
			});
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res) {
		req.logout();
		req.session.destroy();
		res.json({ auth: false });
	}

	async resetPassword(req, res, next) {
		try {
			// email,password,comfirm password
			const { email } = req.body;

			if (!(await isUserEmailExist(email))) {
				return res.json({ message: 'Email is not exist', emailSent: false });
			}

			await sendEmail(req.body, '/verify-password');
			return res.json({ emailSent: true });
		} catch (err) {
			next(err);
		}
	}

	async verifyUserResetPassword(req, res, next) {
		try {
			const token = req.query.token;
			const user = jwtUtils.verifyToken(token, process.env.TOKEN_LINK_VERIFY);

			if (!user) {
				return res.redirect(appConfig.clientURl + '/auth/expired');
			}

			const { email, password } = user;
			const newPassword = await hashPassword(password);

			const { data } = await updateUserPassword({ email, newPassword });

			if (data.update_slekret_users.affected_rows) {
				return res.redirect(appConfig.clientURl + '/auth/login');
			}
		} catch (err) {
			next(err);
		}
	}
	async setUsername() {}

	async githubCallBack(req, res, next) {
		try {
			const { email, avatar_src } = req.user;
			const { data } = await getUserByEmail({ email });

			const userIsNull = data.slekret_users.length === 0;

			if (!userIsNull) {
				const { id, username } = data.slekret_users[0];
				setUserSession({ id, username, avatar_src }, req);
				return res.redirect(appConfig.clientURl);
			}
			res.redirect(appConfig.clientURl + '/auth/setupusername');
		} catch (err) {
			next(err);
		}
	}
}
module.exports = AuthController;
