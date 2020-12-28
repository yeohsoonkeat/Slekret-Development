import React, { useState } from 'react';

export default function DropDown({ setPreviewDate, previewDate }) {
	const listOfDropDown = [7, 30, 90, 365];
	const [toggle, setToggle] = useState(false);
	return (
		<div className="cursor-pointer select-none">
			<div className="flex items-center" onClick={() => setToggle(!toggle)}>
				<h1 className="text-white text-2xl font-bold">
					Last {previewDate} days
				</h1>
				{toggle ? (
					<svg
						className="w-8 h-8 ml-2"
						fill="none"
						stroke="#fff"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 15l7-7 7 7"
						/>
					</svg>
				) : (
					<svg
						className="w-8 h-8 ml-2"
						fill="none"
						stroke="#fff"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				)}
			</div>

			<div className={`${toggle ? 'block' : 'hidden'} flex p-2`}>
				{listOfDropDown.map((day, key) => {
					return (
						<p
							key={key}
							className="text-xl ring-blue-400  ring-2 rounded text-white p-5 hover:bg-blue-400 hover:text-white transition m-1"
							onClick={() => {
								setPreviewDate(day);
								setToggle(!toggle);
							}}
						>
							{day}
						</p>
					);
				})}
			</div>
		</div>
	);
}
