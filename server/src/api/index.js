const express = require('express');
const api = express.Router();

api.use('/auth', require('./auth'));
// api.use(require('./error'));

module.exports = api;
