const bcrypt = require('bcrypt');

const comparePassword = async (passsword, hasedPassword) => {
	return await bcrypt.compare(passsword, hasedPassword);
};
module.exports = comparePassword;
