import { useState } from 'react';

export default function QuestionEditor({
	className,
	setTitle,
	setContent,
	setListofTags,
	listOfTags,
}) {
	const [tag, setTag] = useState('');

	const handleTag = (e) => {
		const tag = e.target.value;
		if (tag.substr(-1).match(' ') && tag.trim()) {
			setListofTags((listOfTags) => [...listOfTags, tag]);
			return setTag('');
		}

		if (tag.match(/^[a-z0-9]*$/gi)) {
			setTag(tag);
		}
	};
	const removeTag = (index) => {
		setListofTags((listOfTags) => listOfTags.filter((_, i) => i !== index));
	};

	return (
		<div className={className}>
			<div className="flex flex-col w-full h-full">
				<input
					placeholder="Question title.."
					className="m-2 p-2 w-11/12 resize-none text-2xl md:text-3xl items-center font-black focus:outline-none"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div className="m-2 p-2 flex flex-wrap">
					{listOfTags.map((item, index) => {
						return (
							<span
								key={index}
								className="bg-gray-200 mr-2 p-1 rounded mt-2 cursor-pointer"
								onClick={() => removeTag(index)}
							>
								{item} x
							</span>
						);
					})}
				</div>

				<input
					value={tag}
					placeholder="Add up to 4 tags.."
					className=" m-2 p-2 w-11/12 resize-none   items-center focus:outline-none  text-lg md:text-xl"
					onChange={handleTag}
				/>

				<textarea
					placeholder="Question description.."
					className="flex-1  pt-2 m-2 p-2 w-11/12 resize-none  items-center  focus:outline-none break-all"
					onChange={(e) => {
						setContent(e.target.value);
					}}
				></textarea>
			</div>
		</div>
	);
}
