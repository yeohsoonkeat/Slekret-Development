import React from 'react'

export default function Layout({ children }) {
	return (
		<main
			className="min-h-screen flex justify-center items-center bg-gray-900"
			style={{
				backgroundImage: `url(${
					process.env.PUBLIC_URL + '/assets/register_bg_2.png'
				})`,
			}}
		>
			{children}
		</main>
	)
}
