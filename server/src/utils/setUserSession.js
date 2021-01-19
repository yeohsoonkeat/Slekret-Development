const jwtUtils = require('./jwt');
const setUserSession = (user, req) => {
	const refreshToken = jwtUtils.generateRefreshToken(user.id);
	req.session.refreshToken = refreshToken;
	req.session.user = user;
};

module.exports = setUserSession;
