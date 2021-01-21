import React from 'react';

export default function EditorImageCover({ imgSrc }) {
	return (
		<div className="w-full h-80 border-2 flex items-center justify-center cursor-pointer hover:tracking-wide transition-all relative">
			{imgSrc ? (
				<img
					src={imgSrc}
					alt=""
					className="w-full h-full object-cover object-center"
				/>
			) : (
				<div>
					<h1 className="cursor-pointer border-2 px-10 py-4">AddCover</h1>
					<input
						className="cursor-pointer w-full h-full opacity-0 absolute top-0"
						type="file"
					/>
				</div>
			)}
		</div>
	);
}
