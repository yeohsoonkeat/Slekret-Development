import React, { memo } from 'react';
import MarkDown from '../../../components/MarkDown';

export default function QuestionPreview({
	className,
	title,
	content,
	listOfTags,
}) {
	return (
		<div className={className}>
			<div className="flex flex-col h-full overflow-scroll">
				<QuestionTitle title={title} />
				<div className="flex flex-wrap">
					{listOfTags.map((tag, index) => {
						return (
							<span key={index} className="m-2">
								#{tag}
							</span>
						);
					})}
				</div>

				<MarkDown content={content} className="w-full mt-10 p-2 break-all" />
			</div>
		</div>
	);
}

const QuestionTitle = memo(({ title }) => {
	return (
		<h1 className="break-all m-2 p-2">
			Q: <span className="text-gray-500">{title}</span>
		</h1>
	);
});
