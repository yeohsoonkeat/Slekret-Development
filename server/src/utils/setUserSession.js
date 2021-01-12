const jwtUtils = require('./jwt');
const setUserSession = (userId, profileImg, req) => {
	const refreshToken = jwtUtils.generateRefreshToken(userId);
	req.session.refreshToken = refreshToken;
	req.session.user = { userId, profileImg };
};

module.exports = setUserSession;
