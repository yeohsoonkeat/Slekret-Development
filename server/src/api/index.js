const express = require('express');
const path = require('path');

const isUserAuthenticated = require('../middleware/isUserAuthenticated');

const api = express.Router();

api.use('/auth', require('./auth'));
api.get('/token', isUserAuthenticated, require('./getToken'));

api.use('/file', isUserAuthenticated, require('./fileUpload'));

api.use('/static', express.static(path.join(__dirname, '../assets')));

api.use(function(err, req, res) {
	res.status(500).send('Something broke!');
});
module.exports = api;
