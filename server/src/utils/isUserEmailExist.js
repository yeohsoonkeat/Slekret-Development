const getUserByEmail = require('../db/getUserByEmail')

const isUserEmailExist = async (email) => {
	const { data } = await getUserByEmail({ email })
	if (data.slekret_users.length === 0) {
		return false
	} else {
		return true
	}
}

module.exports = isUserEmailExist
