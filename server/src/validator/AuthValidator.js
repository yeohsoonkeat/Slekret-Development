const { check } = require('express-validator');

class AuthValidator {
	register() {
		return [
			check('email')
				.isEmail()
				.not()
				.isEmpty(),
			check('password')
				.isLength({ min: 6 })
				.not()
				.isEmpty(),
			check('confirm-password')
				.isLength({ min: 6 })
				.not()
				.isEmpty(),
			check('username')
				.not()
				.isEmpty(),
			check('displayname')
				.not()
				.isEmpty(),
		];
	}
	login() {
		return [
			check('email')
				.not()
				.isEmpty()
				.isEmail(),
			check('password')
				.not()
				.isEmpty()
				.isLength({ min: 6 }),
		];
	}
}

module.exports = AuthValidator;
