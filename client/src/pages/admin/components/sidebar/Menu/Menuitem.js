import { NavLink } from 'react-router-dom';
import MenuItemIcon from './MenuIcon';

const MenuItem = ({ item }) => {
	const { title, awesomeIcon, route } = item;
	return (
		<li className="items-center">
			<NavLink
				className={
					'text-xs uppercase py-3 font-bold block text-gray-800 hover:text-gray-600'
				}
				activeClassName="text-blue-500 hover:text-blue-600"
				to={route}
			>
				<MenuItemIcon awesomeIcon={awesomeIcon} route={route} />
				{title}
			</NavLink>
		</li>
	);
};

export default MenuItem;
