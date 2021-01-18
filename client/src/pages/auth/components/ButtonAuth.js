import React from 'react';

export default function ButtonAuth({ value }) {
	return (
		<button
			type="submit"
			className="w-full bg-blue-500 text-white mt-5 p-3 rounded uppercase hover:tracking-wider transition-all hover:shadow-inner focus:outline-none text-sm"
		>
			{value}
		</button>
	);
}
