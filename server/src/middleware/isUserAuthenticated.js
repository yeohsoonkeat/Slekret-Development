const isUserAuthenticated = (req, res, next) => {
	if (req.session.refreshToken) {
		next()
	} else {
		res.json({
			auth: false,
		})
	}
}

module.exports = isUserAuthenticated
