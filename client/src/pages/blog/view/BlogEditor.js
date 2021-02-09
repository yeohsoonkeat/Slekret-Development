import EditorContent from '../components/editor/EditorContent';
import EditorAritcleCover from '../components/editor/EditorAritcleCover';
import EditorInputTags from '../components/editor/EditorInputTags';
import EditorMeunBar from '../components/editor/EditorMeunBar';
import EditorPreview from '../components/editor/EditorPreview';
import EditorTitle from '../components/editor/EditorTitle';
import EditorErrorAlert from '../components/editor/EditorErrorAlert';
import useEditorStateProvider from '../hook/useEditorStateProvider';
import { gql, useMutation } from '@apollo/client';
import generateListOfTag from '../utils/generateListOfTags';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function BlogEditor() {
	const [editorState, editorDispatch] = useEditorStateProvider();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/blog/edit') {
			editorDispatch({
				type: 'EDIT_BlOG',
				payload: location.state?.blog,
			});
		} else {
			editorDispatch({
				type: 'EDIT_BlOG',
				payload: JSON.parse(window.localStorage.getItem(location.pathname)) || {
					title: '',
					content: '',
					articleCover: '',
					tags: '',
				},
			});
		}
	}, [editorDispatch, location.state?.blog, location]);

	const [postNewArticle, { loading, data, error }] = useMutation(
		POST_NEW_ARTICLE
	);
	const [editBlog] = useMutation(EDIT_BLOG_ARTICLE, {
		onCompleted() {
			window.localStorage.removeItem(location.pathname);

			window.open(
				`/blog/${location.state.blogId}/${editorState.blog.title
					.split(' ')
					.join('-')}`,
				'_self'
			);
		},
	});

	const handleUpdate = () => {
		const { articleCover, title, content } = editorState.blog;

		if (!title.trim()) {
			editorDispatch({
				type: 'SET_ERROR_MESSAGE',
				payload: 'Title can not be blank.',
			});
			return;
		}
		if (!content.trim()) {
			editorDispatch({
				type: 'SET_ERROR_MESSAGE',
				payload: 'Content can not be blank.',
			});
			return;
		}
		editBlog({
			variables: {
				blogId: location.state.blogId,
				content,
				title,
				articleCover,
			},
		});
	};

	const handleOnClick = () => {
		const { articleCover, title, content, tags } = editorState.blog;
		const listOfTags = generateListOfTag(tags);
		if (!title.trim()) {
			editorDispatch({
				type: 'SET_ERROR_MESSAGE',
				payload: 'Title can not be blank.',
			});
			return;
		}
		if (!content.trim()) {
			editorDispatch({
				type: 'SET_ERROR_MESSAGE',
				payload: 'Content can not be blank.',
			});
			return;
		}
		postNewArticle({
			variables: {
				content,
				title,
				articleCover,
				tags: listOfTags,
			},
		});
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}
	if (error) {
		window.open('/error/500', '_self');
	}

	if (data?.insert_blog_articles_one?.id) {
		window.localStorage.removeItem(location.pathname);
		window.open(
			`/blog/${
				data?.insert_blog_articles_one?.id
			}/${data?.insert_blog_articles_one?.title.split(' ').join('-')}`,
			'_self'
		);
	}

	return (
		<>
			<div className="max-w-6xl min-h-screen mx-auto p-5">
				<div className="sticky top-0 z-20 bg-white">
					<EditorErrorAlert />
					<EditorMeunBar />
				</div>

				<EditorAritcleCover />
				{editorState.showPreview ? (
					<EditorPreview />
				) : (
					<>
						<EditorTitle />
						<EditorInputTags />
						<EditorContent />
					</>
				)}
				<hr />
				<div className="fixed bottom-0 bg-white max-w-6xl w-full py-3">
					{location.pathname === '/blog/edit' ? (
						<button
							className=" bg-blue-500 text-white mt-2 px-14 py-3 rounded hover: tracking-wider transition-all "
							onClick={handleUpdate}
						>
							Update
						</button>
					) : (
						<button
							className=" bg-blue-500 text-white mt-2 px-14 py-3 rounded hover: tracking-wider transition-all "
							onClick={handleOnClick}
						>
							Publish
						</button>
					)}
				</div>
			</div>
		</>
	);
}

const POST_NEW_ARTICLE = gql`
	mutation MyMutation(
		$content: String
		$title: String
		$articleCover: String
		$tags: [blog_article_tags_insert_input!]!
	) {
		insert_blog_articles_one(
			object: {
				content: $content
				title: $title
				article_cover: $articleCover
				blog_article_tags: { data: $tags }
			}
		) {
			id
			title
		}
	}
`;

const EDIT_BLOG_ARTICLE = gql`
	mutation MyMutation(
		$blogId: uuid
		$articleCover: String
		$content: String
		$title: String
	) {
		update_blog_articles(
			where: { id: { _eq: $blogId } }
			_set: { article_cover: $articleCover, content: $content, title: $title }
		) {
			affected_rows
		}
	}
`;
