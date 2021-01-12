const appConfig = require('../config/app.config');
const jwtUtils = require('../utils/jwt');
const isUserAuthenticated = (req, res, next) => {
	if (req.session.refreshToken) {
		next();
	} else {
		res.json({
			auth: false,
			token: jwtUtils.generateGuestToken(),
			user: {
				profileImg: appConfig.backendUrl + '/static/default_profile.svg',
			},
		});
	}
};

module.exports = isUserAuthenticated;
