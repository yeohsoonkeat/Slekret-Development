const AnimatedIconHamburgerMenu = ({
	color,
	hoveredColor,
	children,
	isOpen,
}) => {
	return (
		<div className={`w-6 h-5 relative transform rotate-0 group`}>
			{children}
			<span
				className={`group-hover:${hoveredColor} ${color} block absolute h-1/5 rounded-full transform rotate-0 transition-opacity duration-1000 ${
					isOpen
						? 'top-2 left-1/2 w-0 opacity-0'
						: 'top-0 left-0 w-full opacity-100'
				}`}
			/>
			<span
				className={`group-hover:${hoveredColor} ${color} block absolute h-1/5 rounded-full opacity-100 transform left-0 w-full top-2 transition-transform duration-500 ${
					isOpen ? 'rotate-45' : 'rotate-0'
				}`}
			/>
			<span
				className={`group-hover:${hoveredColor} ${color} block absolute h-1/5 rounded-full opacity-100 transform left-0 w-full top-2 transition-transform duration-500 ${
					isOpen ? '-rotate-45' : 'rotate-0'
				}`}
			/>
			<span
				className={`group-hover:${hoveredColor} ${color} block absolute h-1/5 rounded-full opacity-100 transform rotate-0 transition-opacity duration-1000 ${
					isOpen
						? 'top-2 left-1/2 w-0 opacity-0'
						: 'top-4 left-0 w-full opacity-100'
				}`}
			/>
		</div>
	);
};

export default AnimatedIconHamburgerMenu;
