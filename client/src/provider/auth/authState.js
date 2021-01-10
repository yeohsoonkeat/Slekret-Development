const initialState = {
	auth: false,
	token: '',
}

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'UPDATE_AUTH':
			return {
				...state,
				auth: payload.auth,
				token: payload.token,
			}
		case 'USER_LOGOUT':
			return {
				initialState,
			}
		default:
			return state
	}
}
export { initialState, reducer }
