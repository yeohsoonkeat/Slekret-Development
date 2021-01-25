import React, { memo } from 'react';
import useEditorStateProvider from '../hook/useEditorStateProvider';

function EditorTitle() {
	const [editorState, editorDispatch] = useEditorStateProvider();
	const blogTitle = editorState.blog.title;

	const handleOnChange = (e) => {
		editorDispatch({
			type: 'SET_BLOG_TITLE',
			payload: e.target.value,
		});
		window.localStorage.setItem(
			'blogEditor',
			JSON.stringify({ ...editorState.blog })
		);
	};

	return (
		<textarea
			className="mt-10 font-black text-4xl  w-full focus:outline-none  resize-none"
			placeholder="Blog title.."
			onChange={handleOnChange}
			value={blogTitle}
		/>
	);
}

export default EditorTitle;
