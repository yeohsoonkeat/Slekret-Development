const express = require('express');
const fs = require('fs');
const path = require('path');
const appConfig = require('../config/app.config');

const router = express.Router();
const form = require('../config/fileUpload.config');

router.post('/file-upload', (req, res) => {
	const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

	form.parse(req, function(err, fields, files) {
		if (fileTypes.indexOf(files.image.type) === -1) {
			return res.json({ message: 'File not support' });
		}

		const oldPath = files.image.path;

		const fileName = Date.now() + '.' + files.image.type.split('/')[1];
		const newPath = path.join(__dirname, 'assets') + '/' + fileName;

		const rawData = fs.readFileSync(oldPath);

		fs.writeFile(newPath, rawData, function(err) {
			if (err) res.json(err);

			return res.json({
				file_link: appConfig.backendUrl + '/static/' + fileName,
			});
		});
	});
});

module.exports = router;
