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
	const [editorState] = useEditorStateProvider();

	const [postNewArticle, { loading }] = useMutation(POST_NEW_ARTICLE);

	const handleOnClick = () => {
		const { articleCover, title, content, tags } = editorState.blog;
		const listOfTags = generateListOfTag(tags);
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

	return (
		<div className="max-w-6xl min-h-screen mx-auto p-5">
			<EditorMeunBar />
			<EditorErrorAlert />
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
			<button
				className=" bg-blue-500 text-white mt-2 px-14 py-3 rounded hover: tracking-wider transition-all"
				onClick={handleOnClick}
			>
				Publish
			</button>
		</div>
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
		}
	}
`;
