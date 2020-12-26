import React from 'react';

export default function ToggleMenuIcon({ collapseShow, setCollapseShow }) {
	const isHidden = collapseShow === 'hidden';
	return (
		<button
			className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
			type="button"
			onClick={() =>
				setCollapseShow(isHidden ? 'bg-white m-2 py-3 px-6' : 'hidden')
			}
		>
			{isHidden ? (
				<i className="fas fa-bars"></i>
			) : (
				<i className="fas fa-times"></i>
			)}
		</button>
	);
}
