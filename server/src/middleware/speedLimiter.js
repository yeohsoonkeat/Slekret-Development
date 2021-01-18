const slowDown = require('express-slow-down');

const speedLimiter = (windowMs, delayAfter, delayMs) =>
	slowDown({
		windowMs,
		delayAfter,
		delayMs,
	});

module.exports = speedLimiter;
