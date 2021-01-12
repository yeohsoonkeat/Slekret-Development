const dbExecution = require('../utils/dbExecution');

const HASURA_OPERATION = `
query MyQuery($username: String) {
  slekret_users(where: {username: {_eq: $username}}) {
    username
  }
}
`;

// execute the parent operation in Hasura
const getUserByUsername = async (variables) => {
	return await dbExecution(variables, HASURA_OPERATION);
};

module.exports = getUserByUsername;
