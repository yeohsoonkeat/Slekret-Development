const jwtUtils = require('./jwt');
const setUserSession = (username, profileImg, req) => {
	const refreshToken = jwtUtils.generateRefreshToken(username);
	req.session.refreshToken = refreshToken;
	req.session.user = { username, profileImg };
};

module.exports = setUserSession;
