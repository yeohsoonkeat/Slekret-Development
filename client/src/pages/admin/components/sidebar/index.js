import React from 'react';
import Brand from './Brand';
import Divider from './Divider';
import Menu from './Menu';
import ToggleMenuIcon from './ToggleMenuButton';
import Wrapper from './Wrapper';

export default function SideBar() {
	const title = 'Slekret dashboard';
	const items = [
		{
			route: '/admin/dashboard',
			title: 'dashboard',
			awesomeIcon: 'fas fa-tv',
		},
		{
			route: '/admin/setting',
			title: 'setting',
			awesomeIcon: 'fas fa-tools',
		},
	];
	const [collapseShow, setCollapseShow] = React.useState('hidden');

	return (
		<Wrapper>
			<div>
				<ToggleMenuIcon
					setCollapseShow={setCollapseShow}
					collapseShow={collapseShow}
				/>
				<Brand title={title} />
			</div>
			<div className={`${collapseShow} md:block`}>
				<Divider />
				<Menu title="Admin Panel" items={items} />
			</div>
		</Wrapper>
	);
}
