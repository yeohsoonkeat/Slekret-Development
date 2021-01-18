const rateLimit = require('express-rate-limit');

const limiter = (windowMs, max) =>
	rateLimit({
		windowMs,
		max,
		message: { message: 'To many request, Please Try again after an hour' },
	});

module.exports = limiter;
