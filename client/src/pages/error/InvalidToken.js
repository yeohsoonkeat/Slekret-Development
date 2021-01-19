import React from 'react';
import { Link } from 'react-router-dom';
import IconLeft from '../../icons/ic_left';

export default function InvalidToken() {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<svg
				className=" w-64 h-64"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
					clipRule="evenodd"
				/>
			</svg>
			<h1 className="text-3xl font-semibold">
				Unfortunately, your link is expired
			</h1>
			<p className=" text-gray-400 mt-2">
				but don't worry you can do it again.
			</p>
			<Link
				to="/auth"
				className="flex hover:tracking-wider transition-all px-20 py-5"
			>
				<IconLeft filled className="w-6 h-6" />
				back to sign in
			</Link>
		</div>
	);
}
