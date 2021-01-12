const fetch = require('node-fetch');

const HASURA_OPERATION = `
mutation MyMutation($email: String, $newPassword: String) {
    update_slekret_users(where: {email: {_eq: $email}}, _set: {password: $newPassword}) {
      affected_rows
    }
  }
  
`;

// execute the parent operation in Hasura
const updateUserPassword = async (variables) => {
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

module.exports = updateUserPassword;
