import React from 'react';
import IconDark from '../../../icons/ic_dark';

export default function Title({ value }) {
	return (
		<div className="flex justify-between">
			<h1 className="text-xl">{value}</h1>
			<IconDark className="w-6 h-6 cursor-pointer transform hover:scale-105" />
		</div>
	);
}
