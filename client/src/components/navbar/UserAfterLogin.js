import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthProvider from '../../hook/useAuthProvider';
import ApiService from '../../service/api';

const api = new ApiService();

export default function UserAfterLogin({ userImg, username }) {
	const [openDropDown, setOpenDropDown] = useState(false);
	const authDispatch = useAuthProvider()[1];

	const handleLogout = async () => {
		setOpenDropDown(false);
		authDispatch({ type: 'USER_LOGOUT' });
		window.localStorage.clear();
		await api.logout('/auth/logout').catch((er) => {
			window.open('/error/500');
		});
	};

	const avatarSrc = window.localStorage.getItem('avatarSrc') || userImg;

	return (
		<div className="relative">
			<img
				src={avatarSrc}
				alt=""
				className="rounded-full w-12 h-12 ring-1 cursor-pointer"
				onClick={() => setOpenDropDown(!openDropDown)}
			/>
			{openDropDown && (
				<div className="absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 mt-2">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						<Link
							onClick={() => setOpenDropDown(false)}
							to={`/user/${username}`}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer hover:tracking-wide transition-all"
						>
							Your profile
						</Link>
						<Link
							onClick={() => setOpenDropDown(false)}
							to="/user/setting"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
						>
							Settting
						</Link>
						<span
							onClick={handleLogout}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:tracking-wide transition-all cursor-pointer"
						>
							Logout
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
