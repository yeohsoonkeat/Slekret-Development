const fetch = require('node-fetch')

const HASURA_OPERATION = `
mutation MyMutation($id: uuid, $password: String, $email: String, $username: String,$fullname:String) {
    insert_slekret_users(objects: {id: $id, password: $password, email: $email, username: $username,fullname:$fullname}, on_conflict: {constraint: slekret_users_email_key, update_columns: []}) {
      affected_rows
      returning {
        id
      }
    }
  }
  
`

// execute the parent operation in Hasura
const addUser = async (variables) => {
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

module.exports = addUser
