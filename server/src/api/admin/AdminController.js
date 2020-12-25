module.exports = {
	getallUsers: (req, res) => {
		res.status(200).json({ users: 500 })
	},

	getallThreads: (req, res) => {
		res.status(200).json({ threds: 1000 })
	},

	getAllPosts: (req, res) => {
		res.status(200).json({ posts: 5000 })
	},

	getAllAttactments: (req, res) => {
		res.status(200).json({ attachments: 4000 })
	},
}
