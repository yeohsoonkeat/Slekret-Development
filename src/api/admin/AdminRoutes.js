const router = require('express').Router()
const AdminController = require('./AdminController')
module.exports = (app) => {
	router.route('/allusers').post(AdminController.getallUsers)
	app.use('/admin', router)
}
