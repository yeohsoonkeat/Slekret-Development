require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const appConfig = require('../../config/app.config');
const jwtUtils = require('../../utils/jwt');
const createUser = require('../../db/createUser');
const sendEmail = require('../../utils/sendEmailVerify');
const hashPassword = require('../../utils/hashPassword');
const getUserByEmail = require('../../db/getUserByEmail');
const isUserEmailExist = require('../../utils/isUserEmailExist');
const isUserUsernameExist = require('../../utils/isUserUsernameExist');
const setUserSession = require('../../utils/setUserSession');
const updateUserPassword = require('../../db/updateUserPassword');

module.exports = {
	// POST register user
	userRegister: async (req, res) => {
		const { username, email } = req.body;

		// first attempt
		if (!(await isUserEmailExist(email))) {
			if (!(await isUserUsernameExist(username))) {
				try {
					await sendEmail(req.body, 'verifyUser');
					res.json({
						verify: true,
					});
				} catch (er) {
					res.json({
						message: 'can not send Email',
					});
				}
			} else {
				return res.json({
					message: 'Username is already exist',
				});
			}
		} else {
			return res.json({
				message: 'Email is already exist',
			});
		}
	},

	//GET verify user
	verifyUser: async (req, res) => {
		const token = req.query.token;
		const user = jwtUtils.verifyToken(token, process.env.TOKEN_LINK_VERIFY);

		if (user) {
			let userId = uuidv4();
			const { email, password, displayname, username } = user;
			const { data } = await getUserByEmail({ email });
			const userExist = data.slekret_users.length !== 0;

			if (userExist) {
				let { id, username } = data.slekret_users[0];
				const profileImg = data.slekret_users[0].avatar_src;
				setUserSession({ id, username }, profileImg, req);
				res.redirect(appConfig.clientURl);
			}

			const hashpassword = await hashPassword(password);
			const { errors } = await createUser({
				id: userId,
				email,
				password: hashpassword,
				displayname,
				username,
				avatar_src: appConfig.defaultAvatar,
			});

			if (errors) {
				res.status(400).json(errors[0]);
			}

			setUserSession({ id: userId, username }, appConfig.defaultAvatar, req);
			res.redirect(appConfig.clientURl + '/auth/verify');
		} else {
			req.session.destroy();
			req.logout();
			res.redirect(appConfig.clientURl + '/auth/expired');
		}
	},
	userForgetPassword: async (req, res) => {
		const { email } = req.body;

		if (!(await isUserEmailExist(email))) {
			return res.json({
				message: 'Sorry your email is not exist',
				isSentEmail: false,
			});
		}

		await sendEmail(req.body, 'verifyPassword');
		return res.json({ isSentEmail: true });
	},

	verifyPassword: async (req, res) => {
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
	},

	//POST user login

	userLogin: async (req, res) => {
		const { email, password } = req.body;

		const { data, errors } = await getUserByEmail({ email });
		if (errors) {
			res.status(400).json(errors[0]);
		}

		if (data.slekret_users.length !== 0) {
			const hashPassword = data.slekret_users[0].password;
			const username = data.slekret_users[0].username;
			const profileImg = data.slekret_users[0].avatar_src;
			const id = data.slekret_users[0].id;

			const isPasswordCorrect = await bcrypt.compare(password, hashPassword);

			if (isPasswordCorrect) {
				setUserSession({ id, username }, profileImg, req);
				res.json({
					auth: true,
				});
			}
		} else {
			res.json({
				message: 'Unable to Login',
				auth: false,
			});
		}
	},

	//POST user logout

	userLogout: async (req, res) => {
		req.logout();
		req.session.destroy();
		res.json({
			auth: false,
		});
	},

	// handle github authCallBack

	authGithubCallback: async (req, res) => {
		const { email, profileImg } = req.user;
		const { data } = await getUserByEmail({ email });
		const userIsNull = data.slekret_users.length === 0;

		if (!userIsNull) {
			const { id, username } = data.slekret_users[0];
			setUserSession({ id, username }, profileImg, req);
			return res.redirect(appConfig.clientURl);
		}

		res.redirect(appConfig.clientURl + '/auth/usernameanddisplayname');
	},

	// ------------ //

	usernameCreation: async (req, res) => {
		const socialUserSession = req.user;

		if (!socialUserSession) {
			return res.json({
				message: 'Invalid Request.',
				fail: true,
			});
		}
		const { email, profileImg } = socialUserSession;
		const { data } = await getUserByEmail({ email });
		const userIsNull = data.slekret_users.length === 0;

		if (userIsNull) {
			const { username, displayname } = req.body;

			if (await isUserUsernameExist(username)) {
				return res.json({
					message: 'Username is already exist',
				});
			}

			const userId = uuidv4();

			const { data, errors } = await createUser({
				email,
				username,
				displayname,
				id: userId,
				password: null,
				avatar_src: profileImg,
			});
			if (errors) {
				return res.json({ message: 'Internal Sever Error' });
			}

			const userIsCreated = data.insert_slekret_users.affected_rows === 1;

			if (userIsCreated) {
				setUserSession({ id: userId, username }, profileImg, req);
				return res.json({
					auth: true,
				});
			}
		} else {
			const { username, id } = data.slekret_users[0].username;
			setUserSession({ id, username }, profileImg, req);
			return res.json({
				auth: true,
			});
		}
	},
};
