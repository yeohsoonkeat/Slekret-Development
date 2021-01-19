const { v4: uuidv4 } = require('uuid');
const createUser = require('../db/createUser');
const hashPassword = require('../utils/hashPassword');
const getUserByEmail = require('../db/getUserByEmail');
class UserService {
	async createUser(user) {
		const userId = uuidv4();
		const { password, email, username, displayname, avatar_src } = user;
		let hashedPassword;
		if (password) {
			hashedPassword = await hashPassword(password);
		}
		const { errors } = await createUser({
			id: userId,
			password: hashedPassword,
			email,
			username,
			displayname,
			avatar_src,
		});

		if (errors) {
			throw new Error(errors);
		}

		return { id: userId, username, avatar_src };
	}

	async getUserByEmail(email) {
		const { data, errors } = await getUserByEmail({ email });
		if (errors) {
			throw new Error(errors);
		}
		return data.slekret_users;
	}
}

module.exports = UserService;
