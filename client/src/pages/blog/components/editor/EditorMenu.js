import React from 'react';

export default function EditorMenu({ handleOnClick, icon: Icon, text }) {
	return (
		<div>
			<div
				className="flex items-center hover:tracking-wide transition-all cursor-pointer"
				onClick={handleOnClick}
			>
				<Icon className="w-8 h-8 cursor-pointer" />
				<span className=" ml-2">{text}</span>
			</div>
		</div>
	);
}
