import MenuItems from './MenuItems';
import MeunTitle from './MenuTitle';

const Menu = ({ title, items }) => {
	return (
		<div>
			<MeunTitle title={title} />
			<MenuItems items={items} />
		</div>
	);
};

export default Menu;
