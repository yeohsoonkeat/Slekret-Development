module.exports = {
	clientURl:
		process.env.NODE_ENV === 'testing'
			? 'http://10.0.48.52:3000'
			: process.env.CLIENT_URL,
}
