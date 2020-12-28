import React from 'react';
import { Link } from 'react-router-dom';

export default function Brand({ title }) {
	return (
		<Link
			className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
			to="/"
		>
			{title}
		</Link>
	);
}
