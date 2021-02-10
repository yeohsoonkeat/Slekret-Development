const express = require('express');
const path = require('path');
const cors = require('cors');
const appConfig = require('../config/app.config');

const whitelist = [appConfig.clientURl];
const corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
	credentials: true,
};

const isUserAuthenticated = require('../middleware/isUserAuthenticated');

const api = express.Router();

api.use('/auth', require('./auth'));

api.get(
	'/token',
	cors(corsOptions),
	isUserAuthenticated,
	require('./getToken')
);

api.use(
	'/file',
	cors(corsOptions),
	isUserAuthenticated,
	require('./fileUpload')
);

api.use('/static', express.static(path.join(__dirname, '../assets')));

module.exports = api;
