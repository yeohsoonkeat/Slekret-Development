import '../../../styles/editor.css';
import ReactMarkdown from 'react-markdown';
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

const EditorPreview = ({ content, tags, title }) => {
	return (
		<div
			className="overflow-y-scroll  mx-auto"
			style={{
				minHeight: '83vh',
				maxWidth: '800px',
			}}
		>
			<h1 className="font-black text-5xl p-5">{title}</h1>
			<div className="flex flex-wrap p-5">
				{tags &&
					tags.split(',').map((tag) => {
						return <span className="mr-5">#{tag}</span>;
					})}
			</div>

			<ReactMarkdown
				astPlugins={[parseHtml]}
				renderers={renderers}
				children={content}
				className="h-full p-5 break-words markdown"
				plugins={[gfm]}
				allowDangerousHtml
			/>
		</div>
	);
};
export default EditorPreview;
