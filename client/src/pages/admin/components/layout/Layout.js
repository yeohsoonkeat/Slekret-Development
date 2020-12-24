import React from 'react'
import HeaderStats from './HeaderStats'
import SideBar from './SideBar'

export default function Layout({ children }) {
	return (
		<div className="min-h-screen bg-gray-900">
			<SideBar />
			<main className="md:ml-64  min-h-screen">
				<HeaderStats />
				{children}
			</main>
		</div>
	)
}
