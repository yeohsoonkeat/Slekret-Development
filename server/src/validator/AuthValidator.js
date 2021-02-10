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
				.isLength({ min: 6, max: 25 }),
		];
	}

	resetPassword() {
		return [
			check('email')
				.not()
				.isEmpty()
				.isEmail(),
			check('password')
				.isLength({ min: 6 })
				.not()
				.isEmpty(),
			check('confirm-password')
				.isLength({ min: 6 })
				.not()
				.isEmpty(),
		];
	}
	changePassword() {
		return [
			check('username')
				.not()
				.isEmpty()
				.isString(),
			check('password')
				.isLength({ min: 6 })
				.not()
				.isEmpty(),
		];
	}

	setupUsername() {
		return [
			check('username')
				.not()
				.isEmpty(),
			check('displayname')
				.not()
				.isEmpty(),
		];
	}
}

module.exports = AuthValidator;
