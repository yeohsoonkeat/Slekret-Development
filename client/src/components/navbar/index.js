import React, { useState } from 'react';
import AnimatedIconHamburgerMenu from '../../animated_icons/ai_hamburger_menu';
import routes from '../../constant/routes';
import ListMenuOnMobile from './ListMenuOnMobile';
import ListMenuOnWeb from './ListMenuOnWeb';
import Logo from './Logo';
import User from './User';

const navbarCategories = [
	{ text: 'Forum', path: routes.forum },
	{ text: 'Blog', path: routes.blog },
];

export default function NavigationBar() {
	const [openNavBar, setOpenNavBar] = useState(false);

	return (
		<nav className="bg-gray-800 w-full">
			<div className="max-w-8xl mx-auto px-6 py-3  flex items-center justify-between">
				<button
					onClick={() => setOpenNavBar(!openNavBar)}
					className="focus:outline-none block sm:hidden"
				>
					<AnimatedIconHamburgerMenu color="bg-white" isOpen={openNavBar} />
				</button>
				<div className="flex items-center">
					<Logo />
					<ListMenuOnWeb
						navbarCategories={navbarCategories}
						setOpenNavBar={setOpenNavBar}
						openNavBar={openNavBar}
					/>
				</div>
				<User />
			</div>

			<ListMenuOnMobile
				navbarCategories={navbarCategories}
				setOpenNavBar={setOpenNavBar}
				openNavBar={openNavBar}
			/>
		</nav>
	);
}
