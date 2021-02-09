import config from '../../../../config';

const isEdit = window.location.href.match(config.clientUrl + '/blog/edit');

const blogLocalStorage = !isEdit
	? JSON.parse(localStorage.getItem('/blog/new'))
	: '';
const initialState = {
	showPreview: false,
	errorMessage: '',
	blog: {
		title: blogLocalStorage?.title || '',
		tags: blogLocalStorage?.tags || '',
		content: blogLocalStorage?.content || '',
		articleCover: blogLocalStorage?.articleCover || '',
	},
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_ERROR_MESSAGE':
			return {
				...state,
				errorMessage: payload,
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
		case 'SET_TAGS':
			return {
				...state,
				blog: {
					...state.blog,
					tags: payload,
				},
			};

		case 'SET_BLOG_CONTENT':
			return {
				...state,
				blog: {
					...state.blog,
					content: payload,
				},
			};
		case 'SET_BLOG_ARTICLE_COVER':
			return {
				...state,
				errorMessage: '',
				blog: {
					...state.blog,
					articleCover: payload,
				},
			};

		case 'REMOVE_BLOG_ARTICLE_COVER':
			return {
				...state,
				errorMessage: '',
				blog: {
					...state.blog,
					articleCover: '',
				},
			};
		case 'EDIT_BlOG':
			return {
				...state,
				blog: payload ? payload : state.blog,
			};
		default:
			return state;
	}
};
export { initialState, reducer };
