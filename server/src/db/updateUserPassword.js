const dbExecution = require('../utils/dbExecution');

const HASURA_OPERATION = `
mutation MyMutation($email: String, $newPassword: String) {
    update_slekret_users(where: {email: {_eq: $email}}, _set: {password: $newPassword}) {
      affected_rows
    }
  }
  
`;

// execute the parent operation in Hasura
const updateUserPassword = async (variables) => {
	return await dbExecution(variables, HASURA_OPERATION);
};

module.exports = updateUserPassword;
