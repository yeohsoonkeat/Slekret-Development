import React from 'react';

export default function LoadingForm({ loading }) {
	if (loading) {
		return (
			<div className="absolute top-0 left-0 w-full h-full animate-pulse bg-blue-50 flex items-center justify-center">
				<h1>Loading..</h1>
			</div>
		);
	} else {
		return <span></span>;
	}
}
