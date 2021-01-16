const dbExecution = require('../utils/dbExecution');

const HASURA_OPERATION = `
query MyQuery($email: String) {
  slekret_users(where: {email: {_eq: $email}}) {
	id
	email
	password
	username
	avatar_src
  }
}
`;

// execute the parent operation in Hasura
const getUserByEmail = async (variables) => {
	return await dbExecution(variables, HASURA_OPERATION);
};

module.exports = getUserByEmail;
