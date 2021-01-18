import React from 'react';
import Cricle from '../components/Cricle';

export default function LayoutForm({ children }) {
	return (
		<div
			className="h-screen flex items-center justify-center relative overflow-hidden"
			style={{
				backgroundColor: '#F2F6FF',
			}}
		>
			<Cricle />
			{children}
		</div>
	);
}
