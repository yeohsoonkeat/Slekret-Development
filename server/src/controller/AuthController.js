const isUserEmailExist = require('../utils/isUserEmailExist');
const isUserUsernameExist = require('../utils/isUserUsernameExist');
const sendEmail = require('../utils/sendEmailVerify');

class AuthController {
	async register(req, res) {
		const user = req.body;
		console.log(user);
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
	async verifyUser() {}
	async login() {}
	async logout() {}
	async forgetPassword() {}
	async verifyPassword() {}
	async setUsername() {}
	async githubCallBack() {}
}
module.exports = AuthController;
