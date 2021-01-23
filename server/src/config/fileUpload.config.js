const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../assets'));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png|gif/;

	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

	const mimetype = fileTypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: File not support');
	}
};
const upload = multer({
	storage: storage,
	limits: { fileSize: 3 * 1024 * 1024, files: 1 },
	fileFilter: fileFilter,
}).single('image');

module.exports = upload;
