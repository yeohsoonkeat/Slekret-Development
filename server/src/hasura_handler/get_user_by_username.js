const fetch = require('node-fetch')

const HASURA_OPERATION = `
query MyQuery($username: String) {
  slekret_users(where: {username: {_eq: $username}}) {
    username
  }
}
`

// execute the parent operation in Hasura
const getUserByUsername = async (variables) => {
	const fetchResponse = await fetch(process.env.HASURA_URL, {
		method: 'POST',
		body: JSON.stringify({
			query: HASURA_OPERATION,
			variables,
		}),
		headers: {
			'x-hasura-admin-secret': process.env.AMDIN_SECRET,
		},
	})
	const data = await fetchResponse.json()
	return data
}

module.exports = getUserByUsername
