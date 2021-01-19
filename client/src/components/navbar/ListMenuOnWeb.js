import { memo } from 'react';
import { NavLink } from 'react-router-dom';

function ListMenuOnWeb({ navbarCategories, setOpenNavBar, openNavBar }) {
	return (
		<div className="sm:block hidden">
			{navbarCategories.map((route, index) => {
				return (
					<NavLink
						onClick={() => setOpenNavBar(!openNavBar)}
						exact
						to={route.path}
						activeClassName="bg-gray-900"
						key={index}
						className="hover:tracking-wide transition-all mr-8 text-white px-3 py-2 rounded-md text-sm font-medium"
					>
						{route.text}
					</NavLink>
				);
			})}
		</div>
	);
}

export default memo(ListMenuOnWeb);
