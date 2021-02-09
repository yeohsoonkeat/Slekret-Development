import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileNavigation() {
	return (
		<div>
			<div className="flex justify-between items-center bg-gray-300 p-1 mt-5 md:mt-10 rounded">
				<NavLink
					to="/user/sokheng/blog"
					className="text-center flex-1 bg-white p-2 rounded"
				>
					Blog
				</NavLink>
				<NavLink to="/user/sokheng/questions" className="text-center flex-1">
					Questions
				</NavLink>
			</div>
		</div>
	);
}
