import React from 'react';

export default function Layout({ children }) {
	return (
		<main className="min-h-screen flex justify-center items-center bg-gray-900">
			{children}
		</main>
	);
}
