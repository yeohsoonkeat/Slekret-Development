require('dotenv').config();
const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');

const generateVerifyLink = (reqBody, path) => {
	const token = jwt.sign(reqBody, process.env.TOKEN_LINK_VERIFY, {
		algorithm: 'HS256',
		expiresIn: '2m',
	});
	const link = appConfig.backendUrl + `/api/v1/auth${path}?token=${token}`;
	return link;
};

module.exports = generateVerifyLink;
