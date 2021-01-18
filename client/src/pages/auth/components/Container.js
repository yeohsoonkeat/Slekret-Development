import React from 'react';

export default function Container({ children }) {
	return <div className="w-96 bg-white rounded-xl p-5 z-10">{children}</div>;
}
