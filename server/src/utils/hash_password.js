const bcrypt = require('bcrypt')

async function hash_password(password) {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

module.exports = hash_password
