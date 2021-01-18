import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ content, path }) {
	return (
		<p className="text-center mt-5 text-sm">
			{content}{' '}
			<Link
				to={path}
				className="text-blue-500 underline hover:tracking-wider transition-all"
			>
				Sign up
			</Link>
		</p>
	);
}
