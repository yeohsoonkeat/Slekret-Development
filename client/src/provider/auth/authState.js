const initialState = {
	auth: false,
	user: {},
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'UPDATE_AUTH':
			return {
				auth: payload.auth,
				user: payload.user,
			};
		case 'USER_LOGOUT':
			return {
				initialState,
			};
		default:
			return state;
	}
};
export { initialState, reducer };
