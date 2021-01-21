import React from 'react';

export default function EditorInputTags({ handleTag, tags }) {
	return (
		<input
			placeholder="tags react,node"
			className="w-full mb-2 border-2 p-5 focus:outline-none"
			onChange={handleTag}
			value={tags}
			pattern="[0-9A-Za-z, ]+"
		/>
	);
}
