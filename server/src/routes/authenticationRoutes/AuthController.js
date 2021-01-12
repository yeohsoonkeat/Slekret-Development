require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const appConfig = require('../../config/app.config');
const jwtUtils = require('../../utils/jwt');
const createUser = require('../../db/createUser');
const sendEmail = require('../../utils/setEmailVerify');
const hashPassword = require('../../utils/hashPassword');
const getUserByEmail = require('../../db/getUserByEmail');
const isUserEmailExist = require('../../utils/isUserEmailExist');
const isUserUsernameExist = require('../../utils/isUserUsernameExist');
const setUserSession = require('../../utils/setUserSession');

module.exports = {
	// POST register user
	registerUser: async (req, res) => {
		const { username, email } = req.body;

		if (!req.session.verifyCount) {
			req.session.verifyCount = 1;
		}

		// thrird attemp
		if (parseInt(req.session.verifyCount) > 2) {
			req.session.destroy();
			return res.json({
				verify: false,
			});
		}
		// second attempt
		if (parseInt(req.session.verifyCount) === 2) {
			try {
				await sendEmail(req.body);
				return res.json({
					message: 'Email have been to your inbox',
				});
			} catch (er) {
				return res.json({
					message: 'can not send Email',
				});
			}
		}
		// first attempt
		if (!(await isUserEmailExist(email))) {
			if (!(await isUserUsernameExist(username))) {
				try {
					await sendEmail(req.body);

					res.json({
						verify: true,
					});
					req.session.verifyCount = parseInt(req.session.verifyCount) + 1;
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
				userId = data.slekret_users[0].id;
				const profileImg = data.slekret_users[0].avatar_src;
				setUserSession(userId, profileImg, req);
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

			setUserSession(userId, appConfig.defaultAvatar, req);
			res.redirect(appConfig.clientURl + '/auth/verify');
		} else {
			req.session.destroy();
			req.logout();
			res.redirect(appConfig.clientURl + '/auth/expired');
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
			const userId = data.slekret_users[0].id;
			const profileImg = data.slekret_users[0].avatar_src;

			const isPasswordCorrect = await bcrypt.compare(password, hashPassword);

			if (isPasswordCorrect) {
				setUserSession(userId, profileImg, req);
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
			const userId = data.slekret_users[0].id;
			setUserSession(userId, profileImg, req);
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
				setUserSession(userId, profileImg, req);
				return res.json({
					auth: true,
				});
			}
		} else {
			const userId = data.slekret_users[0].id;
			setUserSession(userId, profileImg, req);
			return res.json({
				auth: true,
			});
		}
	},
};
