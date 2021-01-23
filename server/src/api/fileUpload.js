const express = require('express');
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
				console.log(req);
				res.json({
					message: 'file uploaded',
					path: appConfig.backendUrl + '/static/' + req.file.filename,
					fail: false,
				});
			}
		}
	});
});

module.exports = router;
