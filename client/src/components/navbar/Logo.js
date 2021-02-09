import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Logo() {
	return (
		<NavLink
			to="/blog"
			className="hover:tracking-wide transition-all text-white text-xl font-black sm:mr-8"
		>
			Slekret
		</NavLink>
	);
}
