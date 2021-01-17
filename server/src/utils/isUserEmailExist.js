const getUserByEmail = require('../db/getUserByEmail');

const isUserEmailExist = async (email) => {
	const { data } = await getUserByEmail({ email });
	console.log(data);
	if (data.slekret_users.length === 0) {
		return false;
	} else {
		return true;
	}
};

module.exports = isUserEmailExist;
