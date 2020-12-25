const router = require('express').Router()
const AdminController = require('./AdminController')
module.exports = (app) => {
	router.route('/allusers').post(AdminController.getallUsers)
	router.route('/allthreads').post(AdminController.getallThreads)
	router.route('/allPosts').post(AdminController.getAllPosts)
	router.route('/allAttachments').post(AdminController.getAllAttactments)

	app.use('/admin', router)
}
