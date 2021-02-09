import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

function ListMenuOnMobile({ navbarCategories, openNavBar, setOpenNavBar }) {
	return (
		<div className={` ${openNavBar ? 'block' : 'hidden'} px-2 mb-2 sm:hidden`}>
			{navbarCategories.map((route, index) => {
				return (
					<NavLink
						onClick={() => setOpenNavBar(!openNavBar)}
						exact
						to={route.path}
						activeClassName="bg-gray-700"
						key={index}
						className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
					>
						{route.text}
					</NavLink>
				);
			})}
		</div>
	);
}

export default memo(ListMenuOnMobile);
