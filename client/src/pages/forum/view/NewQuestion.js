import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function NewQuestion() {
	const [content, setContent] = useState('');
	const handleEditorChange = (e) => {
		console.log(e.target.value);
		setContent(e.target.value);
	};
	return (
		<div
			className="w-full ring-1 h-screen px-2"
			contentEditable="true"
			onChange={handleEditorChange}
		></div>
	);
}
