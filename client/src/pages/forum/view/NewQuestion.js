import ReactMarkdown from 'react-markdown';

export default function NewQuestion() {
	const source = `
    #hello word
    
    `;

	return (
		<div className="w-full ring-1 h-screen">
			<ReactMarkdown source="# hello" />
			<h1>hello</h1>
		</div>
	);
}
