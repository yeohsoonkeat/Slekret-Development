import React from 'react';

export default function EditorMenu({ setShowPreview, icon: Icon, text }) {
	return (
		<div>
			<div
				className="flex items-center hover:tracking-wide transition-all cursor-pointer"
				onClick={setShowPreview}
			>
				<Icon className="w-8 h-8 cursor-pointer" />
				<span className=" ml-2">{text}</span>
			</div>
		</div>
	);
}
