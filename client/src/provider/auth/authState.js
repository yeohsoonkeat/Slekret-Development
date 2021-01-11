const initialState = {
  auth: false,
  token: '',
  user: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_AUTH':
      return {
        ...state,
        auth: payload.auth,
        token: payload.token,
        user: payload.user,
      };
    case 'USER_LOGOUT':
      console.log('running');
      return {
        initialState,
      };
    default:
      return state;
  }
};
export { initialState, reducer };
