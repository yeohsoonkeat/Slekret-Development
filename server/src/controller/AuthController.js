require('dotenv').config();
const isUserEmailExist = require('../utils/isUserEmailExist');
const isUserUsernameExist = require('../utils/isUserUsernameExist');
const sendEmail = require('../utils/sendEmailVerify');
const jwtUtils = require('../utils/jwt');
const appConfig = require('../config/app.config');
const setUserSession = require('../utils/setUserSession');
const UserService = require('../service/UserService');

const userService = new UserService();

class AuthController {
	async register(req, res) {
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
	}

	async verifyUser(req, res) {
		const token = req.query.token;

		const user = jwtUtils.verifyToken(token, process.env.TOKEN_LINK_VERIFY);

		if (!user) {
			return res.redirect(appConfig.clientURl + '/auth/expired');
		}

		try {
			const result = await userService.createUser(user);

			setUserSession(result, req);
			return res.redirect(appConfig.clientURl);
		} catch (err) {
			return res.status(500).json({ message: 'Can not create user' });
		}
	}

	async login() {}
	async logout() {}
	async forgetPassword() {}
	async verifyPassword() {}
	async setUsername() {}
	async githubCallBack() {}
}
module.exports = AuthController;
