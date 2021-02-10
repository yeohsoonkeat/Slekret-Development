import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useEditorStateProvider from '../../hook/useEditorStateProvider';
import '../../styles/blogStyle.css';

function EditorTitle() {
	const location = useLocation();
	const [editorState, editorDispatch] = useEditorStateProvider();

	const handleOnInput = (e) => {
		editorDispatch({
			type: 'SET_BLOG_TITLE',
			payload: e.target.innerText,
		});
		window.localStorage.setItem(
			location.pathname,
			JSON.stringify({ ...editorState.blog, title: e.target.innerText })
		);
	};
	const handleOnPaste = (e) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		window.document.execCommand('insertText', false, text);
	};
	useEffect(() => {
		window.document.getElementById('editor-title').innerText =
			editorState.blog.title;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className="mt-5 mb-5 font-black text-4xl  w-full focus:outline-none  resize-none content-editable"
			placeholder="Blog title.."
			onInput={handleOnInput}
			contentEditable="true"
			onPaste={handleOnPaste}
			id="editor-title"
		/>
	);
}

export default EditorTitle;
