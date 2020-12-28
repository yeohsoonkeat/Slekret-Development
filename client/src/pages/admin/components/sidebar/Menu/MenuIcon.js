const MenuItemIcon = ({ route, awesomeIcon }) => {
	return (
		<i
			className={`${awesomeIcon} mr-2 text-sm ${
				window.location.href.indexOf(route) !== -1
					? 'opacity-75'
					: 'text-gray-400'
			}`}
		></i>
	);
};

export default MenuItemIcon;
