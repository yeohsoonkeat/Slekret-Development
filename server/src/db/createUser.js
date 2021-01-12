const fetch = require('node-fetch');

const HASURA_OPERATION = `
mutation MyMutation($id: uuid, $password: String, $email: String, $username: String, $displayname: String,$avatar_src:String) {
	insert_slekret_users(objects: {id: $id, password: $password, email: $email, username: $username, displayname: $displayname, avatar_src:$avatar_src}, on_conflict: {constraint: slekret_users_pkey, update_columns: []}) {
	  affected_rows
	  returning {
		id
		avatar_src
	  }
	}
  }
  
`;

// execute the parent operation in Hasura
const createUser = async (variables) => {
	const fetchResponse = await fetch(process.env.HASURA_URL, {
		method: 'POST',
		body: JSON.stringify({
			query: HASURA_OPERATION,
			variables,
		}),
		headers: {
			'x-hasura-admin-secret': process.env.AMDIN_SECRET,
		},
	});
	const data = await fetchResponse.json();
	return data;
};

module.exports = createUser;
