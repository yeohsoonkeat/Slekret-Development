import React from 'react';

export default function Container({ children }) {
	return (
		<div className="relative w-96 bg-white rounded-xl z-10">{children}</div>
	);
}
