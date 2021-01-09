const fetch = require('node-fetch')

const HASURA_OPERATION = `
query MyQuery($email: String) {
  slekret_users(where: {email: {_eq: $email}}) {
    email
  }
}
`

// execute the parent operation in Hasura
const getUserByEmail = async (variables) => {
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

module.exports = getUserByEmail
