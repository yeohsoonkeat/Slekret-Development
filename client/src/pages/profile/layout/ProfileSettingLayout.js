import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileSettingLayout({ children }) {
	return (
		<>
			<div className="max-w-5xl mx-auto  min-h-screen flex py-5 border flex-col sm:flex-row">
				<div className="border-r-2">
					<ul>
						<NavLink
							exact
							to="/user/setting/"
							className="p-3 cursor-pointer block"
							activeClassName="p-3 bg-gray-200 border-l-2 border-gray-500"
						>
							Personal Information
						</NavLink>
						<NavLink
							to="/user/setting/change-password"
							className="	 p-3 cursor-pointer block transition-all"
							activeClassName="bg-gray-200 border-l-2 border-gray-500 p-3"
						>
							Change Password
						</NavLink>
					</ul>
				</div>
				{children}
			</div>
		</>
	);
}
