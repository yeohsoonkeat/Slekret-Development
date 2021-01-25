const blogLocalStorage = JSON.parse(localStorage.getItem('blogEditor'));
const initialState = {
	showPreview: false,
	errorMessage: '',
	blog: {
		title: blogLocalStorage?.title || '',
		content: blogLocalStorage?.content || '',
	},
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_ERROR_MESSAGE':
			return {
				...state,
				errorMessage: payload.message,
			};
		case 'TOGGLE_SHOW_PREVIEW':
			return {
				...state,
				showPreview: !state.showPreview,
			};
		case 'SET_BLOG_TITLE':
			return {
				...state,
				blog: {
					...state.blog,
					title: payload,
				},
			};
		default:
			return state;
	}
};
export { initialState, reducer };
