const dbExecution = require('../utils/dbExecution');

const HASURA_OPERATION = `
mutation MyMutation($username: String, $newPassword: String) {
    update_slekret_users(where: {username: {_eq: $username}}, _set: {password: $newPassword}) {
      affected_rows
    }
  }
  
`;

// execute the parent operation in Hasura
const updateUserPasswordWithUsername = async (variables) => {
	return await dbExecution(variables, HASURA_OPERATION);
};

module.exports = updateUserPasswordWithUsername;
