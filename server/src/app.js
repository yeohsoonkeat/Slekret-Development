//app.js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.status(200).send('Hello World!')
})
// this will
require('./routes')(app)

module.exports = app
