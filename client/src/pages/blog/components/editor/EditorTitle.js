import '../../styles/contentEditorable.css';
import useEditorStateProvider from '../../hook/useEditorStateProvider';
import { useEffect } from 'react';

function EditorTitle() {
	const [editorState, editorDispatch] = useEditorStateProvider();
	const blogTitle = editorState.blog.title;

	const handleOnInput = (e) => {
		console.log(e.target.innerText);
		editorDispatch({
			type: 'SET_BLOG_TITLE',
			payload: e.target.innerText,
		});
		window.localStorage.setItem(
			'blogEditor',
			JSON.stringify({ ...editorState.blog, title: e.target.innerText })
		);
	};
	const handleOnPaste = (e) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		window.document.execCommand('insertText', false, text);
	};

	useEffect(() => {
		window.document.getElementById('editor-title').innerText = blogTitle;
		// eslint-disable-next-line
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
