import useEditorStateProvider from '../../hook/useEditorStateProvider';

export default function EditorContent() {
	const [editorState, editorDispatch] = useEditorStateProvider();
	const content = editorState.blog.content;
	const handleOnChange = (e) => {
		editorDispatch({ type: 'SET_BLOG_CONTENT', payload: e.target.value });
		window.localStorage.setItem(
			'blogEditor',
			JSON.stringify({ ...editorState.blog, content: e.target.value })
		);
	};
	return (
		<>
			<textarea
				className="w-full focus:outline-none p-5 overflow-scroll resize-none h-screen border"
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
