import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedIconHamburgerMenu from '../../animated_icons/ai_hamburger_menu';
import config from '../../config';
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
	const isBlogUrl = window.location.href.match(config.clientUrl + '/blog');
	const isForumUrl = window.location.href.match(
		config.clientUrl + '/questions'
	);

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
				<div className="flex items-center">
					{isBlogUrl && (
						<Link
							to="/blog/new"
							className="bg-blue-500  text-white rounded px-2 mr-5 py-2"
						>
							Write Post
						</Link>
					)}
					{isForumUrl && (
						<Link
							to="/forum/new"
							className="bg-blue-500  text-white rounded px-2 mr-5 py-2"
						>
							Ask question
						</Link>
					)}
					<User />
				</div>
			</div>

			<ListMenuOnMobile
				navbarCategories={navbarCategories}
				setOpenNavBar={setOpenNavBar}
				openNavBar={openNavBar}
			/>
		</nav>
	);
}
