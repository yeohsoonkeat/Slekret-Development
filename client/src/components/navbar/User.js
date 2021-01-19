import React from 'react';
import useAuthProvider from '../../hook/useAuthProvider';
import UserAfterLogin from './UserAfterLogin';
import UserBeforLogin from './UserBeforLogin';

export default function User() {
	const [authState, authDispatch] = useAuthProvider();
	const isAuth =
		authState.auth || window.localStorage.getItem('auth') === 'true';

	const username = authState.user.username;
	const userImg =
		authState.user.avatar_src || window.localStorage.getItem('avatarSrc');
	return (
		<div>
			{isAuth ? (
				<UserAfterLogin
					username={username}
					userImg={userImg}
					authDispatch={authDispatch}
				/>
			) : (
				<UserBeforLogin />
			)}
		</div>
	);
}
