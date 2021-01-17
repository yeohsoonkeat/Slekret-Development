const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
	res.status(500).json({ messsage: req.message, emailSent: false });
});
