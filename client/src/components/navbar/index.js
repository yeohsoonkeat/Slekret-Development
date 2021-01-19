import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AnimatedIconHamburgerMenu from '../../animated_icons/ai_hamburger_menu';
import routes from '../../constant/routes';
import useAuthProvider from '../../hook/useAuthProvider';
import Logo from './Logo';
import UserAfterLogin from './UserAfterLogin';
import UserBeforLogin from './UserBeforLogin';

const navbar_categories = [
	{ text: 'Forum', path: routes.forum },
	{ text: 'Blog', path: routes.blog },
];

export default function NavigationBar() {
	const [openNavBar, setOpenNavBar] = useState(false);
	const [authState] = useAuthProvider();
	const isAuth =
		authState.auth || window.localStorage.getItem('auth') === 'true';

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
					<div className="sm:block hidden">
						{navbar_categories.map((route, index) => {
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
				</div>
				{isAuth ? (
					<UserAfterLogin
						userImg={authState.user.avatar_src}
						username={authState.user.username}
					/>
				) : (
					<UserBeforLogin />
				)}
			</div>
			{/* mobile navlist */}
			<div
				className={` ${openNavBar ? 'block' : 'hidden'} px-2 mb-2 sm:hidden`}
			>
				{navbar_categories.map((route, index) => {
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
		</nav>
	);
}
