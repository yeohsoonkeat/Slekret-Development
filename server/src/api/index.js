const express = require('express');
const api = express.Router();
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
	windowMs: 2 * 60 * 60 * 1000,
	delayAfter: 3,
	delayMs: 1000,
});

const limiter = rateLimit({
	windowMs: 2 * 60 * 60 * 1000,
	max: 10,
});

api.use('/auth', speedLimiter, limiter, require('./auth'));
// api.use(require('./error'));

module.exports = api;
