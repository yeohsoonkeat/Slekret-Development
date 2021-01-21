import React from 'react';

export default function EditorTitle({ handleOnChangeTitle, title }) {
	return (
		<textarea
			className="mt-10 font-black text-4xl  w-full focus:outline-none  resize-none"
			placeholder="Blog title.."
			onChange={handleOnChangeTitle}
			value={title}
		/>
	);
}
