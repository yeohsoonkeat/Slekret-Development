import React from 'react';
import useAuthProvider from '../../hook/useAuthProvider';
import UserAfterLogin from './UserAfterLogin';
import UserBeforLogin from './UserBeforLogin';

export default function User() {
	const [authState, authDispatch] = useAuthProvider();
	const isAuth =
		authState.auth || window.localStorage.getItem('auth') === 'true';

	const username = authState.user.username;

	const avatarSrc =
		window.localStorage.getItem('avatarSrc') !== 'undefined'
			? authState.user.avatar_src || window.localStorage.getItem('avatarSrc')
			: process.env.PUBLIC_URL + '/assets/default_avatar.png';
	return (
		<div>
			{isAuth ? (
				<UserAfterLogin
					username={username}
					avatarSrc={avatarSrc}
					authDispatch={authDispatch}
				/>
			) : (
				<UserBeforLogin />
			)}
		</div>
	);
}
