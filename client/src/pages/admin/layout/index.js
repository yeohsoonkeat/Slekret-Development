import React from 'react';
import HeaderStats from '../components/headerStats';
import SideBar from '../components/sidebar';

export default function Layout({ children }) {
	return (
		<div className="min-h-screen">
			<SideBar />
			<main className="md:ml-64  min-h-screen">
				<HeaderStats />
				{children}
			</main>
		</div>
	);
}
