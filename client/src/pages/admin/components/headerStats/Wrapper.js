import React from 'react';

export default function Wrapper({ children }) {
	return (
		<div className="relative bg-blue-400 md:pt-20 pb-20 pt-10">
			<div className="px-4 md:px-10 mx-auto w-full ">
				<div className="flex flex-wrap">{children}</div>
			</div>
		</div>
	);
}
