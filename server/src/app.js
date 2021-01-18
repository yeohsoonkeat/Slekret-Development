//app.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const sessions = require('express-session');
const isUserAuthenticated = require('./middleware/isUserAuthenticated');
const appConfig = require('./config/app.config');
const form = require('./config/fileUpload.config');
const api = require('./api');

const app = express();

// passport config
require('./config/passport.config');

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(express.json());

app.use(
	sessions({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000 * 3,
		},
	})
);

// middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: appConfig.clientURl,
		methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
		credentials: true,
	})
);

// public folder
app.use('/static', express.static(path.join(__dirname, 'assets')));

// router
app.use('/api/v1', api);

app.post('/file-upload', isUserAuthenticated, (req, res) => {
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

module.exports = app;
