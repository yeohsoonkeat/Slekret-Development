const jwtUtils = require('./jwt')

const setSessionForEmailRegister = (userId, req) => {
	const refreshToken = jwtUtils.generateRefreshToken(userId)
	req.session.refreshToken = refreshToken
	req.session.user = { id: userId }
}

module.exports = setSessionForEmailRegister
