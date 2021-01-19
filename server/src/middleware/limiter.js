const rateLimit = require('express-rate-limit');

const limiter = (windowMs, max) =>
	rateLimit({
		windowMs,
		max,
		statusCode: 200,
		message: {
			status: 429,
			message: 'You are doing that too much. Please try again in one hour.',
		},
	});

module.exports = limiter;
