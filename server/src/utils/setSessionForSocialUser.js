const jwtUtils = require('./jwt');
const setSessionForSocialUser = (userId, profileImg, req) => {
	const refreshToken = jwtUtils.generateRefreshToken(userId);
	req.session.refreshToken = refreshToken;
	req.session.user = { userId, profileImg };
};

module.exports = setSessionForSocialUser;
