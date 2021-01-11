const initialState = {
	auth: false,
	user: {},
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'UPDATE_AUTH':
			return {
				...state,
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
