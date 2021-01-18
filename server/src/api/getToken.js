const jwtUtils = require('../utils/jwt');

const getToken = (req, res) => {
	const refreshToken = req.session.refreshToken;
	const userId = jwtUtils.verifyToken(
		refreshToken,
		process.env.JWT_REFRESH_SECRET
	);

	const token = jwtUtils.hasuraJwtToken(userId);

	const user = req.session.user;

	return res.json({
		token,
		auth: true,
		user,
	});
};
module.exports = getToken;
