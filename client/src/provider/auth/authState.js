const initialState = {
	auth: false,
	user: {
		id:"a7800855-e5f0-45ad-834d-ccc24cbefff0"
		},
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'UPDATE_AUTH':
			return {
				auth: payload.auth,
				user: payload.user,
			};
		case 'USER_LOGOUT':
			return initialState;
		default:
			return state;
	}
};
export { initialState, reducer };
