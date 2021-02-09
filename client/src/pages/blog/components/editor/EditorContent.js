import { useLocation } from 'react-router-dom';
import useEditorStateProvider from '../../hook/useEditorStateProvider';

export default function EditorContent() {
	const location = useLocation();

	const [editorState, editorDispatch] = useEditorStateProvider();
	const content = editorState.blog.content;

	const handleOnChange = (e) => {
		editorDispatch({ type: 'SET_BLOG_CONTENT', payload: e.target.value });
		window.localStorage.setItem(
			location.pathname,
			JSON.stringify({ ...editorState.blog, content: e.target.value })
		);
	};
	return (
		<>
			<textarea
				className="w-full focus:outline-none p-5 resize-none h-screen border mb-10"
				autoFocus={true}
				onChange={handleOnChange}
				value={content}
				placeholder="You content go here as markdown...."
				id="editor-content"
				required
			/>
		</>
	);
}
