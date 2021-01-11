const jwtUtils = require('../utils/jwt');
const isUserAuthenticated = (req, res, next) => {
	if (req.session.refreshToken) {
		next();
	} else {
		res.json({
			auth: false,
			token: jwtUtils.generateGuestToken(),
		});
	}
};

module.exports = isUserAuthenticated;
