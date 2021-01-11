let backendUrl = 'http://10.0.48.52:8000'

if (process.env.NODE_ENV === 'development') {
	backendUrl = 'http://10.0.48.52:8000'
}

const config = {
	backendUrl,
}

export default config
