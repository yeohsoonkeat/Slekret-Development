const jwtUtils = require('../utils/jwt');
const isUserAuthenticated = (req, res, next) => {
	if (req.session.refreshToken) {
		next();
	} else {
		res.json({
			auth: false,
			token: jwtUtils.generateGuestToken(),
			user: {
				id: '7559b8aa-db01-40c9',
			},
		});
	}
};

module.exports = isUserAuthenticated;
