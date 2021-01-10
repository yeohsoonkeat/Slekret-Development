require('dotenv').config()
const express = require('express')
const AuthController = require('./AuthController')

const authRouter = express.Router()

authRouter.route('/register').post(AuthController.registerUser)

authRouter.route('/verify').get(AuthController.verifyUser)

authRouter.route('/login').post(AuthController.userLogin)

authRouter.route('/logout').post(AuthController.userLogout)

module.exports = authRouter
