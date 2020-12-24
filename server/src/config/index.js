require('dotenv').config()

module.exports = {
	port: process.env.PORT,
	development: {
		dialect: 'postgres',
		database: process.env.DATABASE_NAME,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD
	},
	test: {
		dialect: 'postgres',
		database: 'slekret_api_test',
		username: 'postgres',
		password: '123'
	},
	production: {
        
	}
}