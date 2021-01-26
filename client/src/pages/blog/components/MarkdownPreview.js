import ReactMarkdown from 'react-markdown';
import '../../../styles/editor.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import htmlParser from 'react-markdown/plugins/html-parser';
import gfm from 'remark-gfm';

const renderers = {
	code: ({ language, value }) => {
		return (
			<SyntaxHighlighter
				style={atomOneDarkReasonable}
				language={language ?? ''}
				children={value ?? ''}
				wrapLines={true}
				showLineNumbers={true}
			/>
		);
	},
	image: Image,
};

const parseHtml = htmlParser({
	isValidNode: (node) => {
		return node.name === 'iframe' || node.name === 'mark' || node.name === 'a';
	},
});

function Image(props) {
	const handleOnClick = () => {
		alert('hello');
	};
	return (
		<img
			{...props}
			style={{ maxWidth: '100%' }}
			className="mx-auto"
			alt=""
			onClick={handleOnClick}
		/>
	);
}

export default function MarkdownPreview({ content }) {
	return (
		<ReactMarkdown
			astPlugins={[parseHtml]}
			renderers={renderers}
			children={content}
			className="h-full break-words markdown"
			plugins={[gfm]}
			allowDangerousHtml
			id="editor-content"
		/>
	);
}
