require('dotenv').config();
const fetch = require('node-fetch');
const dbExecution = async (variables, HASURA_OPERATION) => {
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

module.exports = dbExecution;
