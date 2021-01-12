const dbExecution = require('../utils/dbExecution');

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
	return await dbExecution(variables, HASURA_OPERATION);
};

module.exports = createUser;
