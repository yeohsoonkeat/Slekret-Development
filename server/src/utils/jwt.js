require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (token, secret) => {
	const user = jwt.verify(
		token,
		secret,
		{ algorithms: 'HS256' },
		(err, user) => {
			if (err) {
				return
			}
			return user
		}
	)
	return user
}

const hasura_jwt_token = (id) => {
	const payload = {
		'https://hasura.io/jwt/claims': {
			'x-hasura-allowed-roles': ['editor', 'user', 'moderator'],
			'x-hasura-default-role': 'user',
			'x-hasura-user-id': id,
		},
	}
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '12h',
	})
	return token
}

const generateRefreshToken = (userId) => {
	const refresh_token = jwt.sign(userId, process.env.JWT_REFRESH_SECRET, {
		algorithm: 'HS256',
	})
	return refresh_token
}

module.exports = { hasura_jwt_token, verifyToken, generateRefreshToken }
