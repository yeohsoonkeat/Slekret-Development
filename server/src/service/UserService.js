const { v4: uuidv4 } = require('uuid');
const appConfig = require('../config/app.config');

const createUser = require('../db/createUser');
const hashPassword = require('../utils/hashPassword');

class UserService {
	async createUser(user) {
		const userId = uuidv4();
		const { password, email, username, displayname } = user;

		const hashedPassword = await hashPassword(password);
		const { errors } = await createUser({
			id: userId,
			password: hashedPassword,
			email,
			username,
			displayname,
			avatar_src: appConfig.defaultAvatar,
		});

		if (errors) {
			throw new Error(errors);
		}
		return { id: userId, username, avatar_src: appConfig.defaultAvatar };
	}
}

module.exports = UserService;
