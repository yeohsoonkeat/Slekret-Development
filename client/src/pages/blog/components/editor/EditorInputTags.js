import React from 'react';
import useEditorStateProvider from '../../hook/useEditorStateProvider';

export default function EditorInputTags() {
	const [editorState, editorDispatch] = useEditorStateProvider();

	const tags = editorState.blog.tags;

	const handleOnChange = (e) => {
		if (e.target.value.match(/[0-9A-Za-z, ]+/g) || e.target.value === '') {
			const value = e.target.value.replace(/[^0-9a-z,]+/g, '');
			editorDispatch({ type: 'SET_TAGS', payload: value });
			window.localStorage.setItem(
				'blogEditor',
				JSON.stringify({ ...editorState.blog, tags: e.target.value })
			);
		}
	};

	return (
		<input
			placeholder="tags react,node"
			className="w-full mb-2 border-2 p-5 focus:outline-none"
			onChange={handleOnChange}
			value={tags}
			pattern="[0-9A-Za-z, ]+"
		/>
	);
}
