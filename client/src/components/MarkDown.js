import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

const renderers = {
	code: ({ language, value }) => {
		return (
			<pre className="bg-blue-100 overflow-x-auto mt-5 mb-5">
				<code className=" overflow-x-auto">{value}</code>
			</pre>
		);
	},
};

const MarkDown = memo(({ className, content }) => {
	return (
		<ReactMarkdown
			children={content}
			renderers={renderers}
			className={className}
		/>
	);
});

export default MarkDown;
