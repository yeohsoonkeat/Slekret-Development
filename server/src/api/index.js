const express = require('express');

const isUserAuthenticated = require('../middleware/isUserAuthenticated');

const api = express.Router();

api.use('/auth', require('./auth'));
api.get('/token', isUserAuthenticated, require('./getToken'));

api.use((err, req, res) => {
	res.status(err.status || 500);
	res.end();
});

module.exports = api;
