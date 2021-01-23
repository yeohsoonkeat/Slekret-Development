const express = require('express');
const fs = require('fs');
const path = require('path');
const appConfig = require('../config/app.config');
const upload = require('../config/fileUpload.config');
const router = express.Router();

router.post('/file-upload', (req, res) => {
	console.log(req.body);
	upload(req, res, (err) => {
		if (err) {
			res.json({
				message: err.message,
				fail: true,
			});
		} else {
			if (!req.file) {
				res.json({
					message: 'Error No file selected',
					fail: true,
				});
			} else {
				res.json({
					message: 'file uploaded',
					path: appConfig.backendUrl + '/static/' + req.file.filename,
					fail: false,
				});
			}
		}
	});
});

router.post('/remove-file', (req, res) => {
	const { filename } = req.body;
	fs.unlink(path.join(__dirname, '../assets/' + filename), function(err) {
		if (err) {
			return res.json({
				message: 'Can not remove file',
				fail: true,
				err,
			});
		}
		return res.json({
			message: 'File removed',
			fail: false,
		});
	});
});

module.exports = router;
