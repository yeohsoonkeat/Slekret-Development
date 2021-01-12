const jwtUtils = require('./jwt');
const setUserSession = (user, profileImg, req) => {
	console.log(user);
	const refreshToken = jwtUtils.generateRefreshToken(user.id);
	req.session.refreshToken = refreshToken;
	req.session.user = { ...user, profileImg };
};

module.exports = setUserSession;
