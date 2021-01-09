const getUserByUsername = require('../db/getUserByUsername')

const isUserUsernameExist = async (username) => {
	const { data } = await getUserByUsername({ username })
	if (data.slekret_users.length === 0) {
		return false
	} else {
		return true
	}
}

module.exports = isUserUsernameExist
