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

export default function BlogEditor() {
	const [editorState, editorDispatch] = useEditorStateProvider();

	const [postNewArticle, { loading, data, error }] = useMutation(
		POST_NEW_ARTICLE
	);

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
		window.localStorage.removeItem('blogEditor');
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
					<button
						className=" bg-blue-500 text-white mt-2 px-14 py-3 rounded hover: tracking-wider transition-all "
						onClick={handleOnClick}
					>
						Publish
					</button>
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
