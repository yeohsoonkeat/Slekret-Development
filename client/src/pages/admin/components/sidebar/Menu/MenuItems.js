import MenuItem from './Menuitem';

const MenuItems = ({ items }) => {
	return (
		<ul className="md:flex-col md:min-w-full flex flex-col list-none">
			{items.map((item, index) => {
				return <MenuItem item={item} key={index} />;
			})}
		</ul>
	);
};

export default MenuItems;
