const express = require('express');
const isUserAuthenticated = require('../middleware/isUserAuthenticated');

const api = express.Router();

api.use('/auth', require('./auth'));
api.get('/token', isUserAuthenticated, require('./getToken'));
// api.use(require('./error'));

module.exports = api;
