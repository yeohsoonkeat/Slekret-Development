import { gql, useQuery } from '@apollo/client';
import React from 'react';
import useAuthProvider from '../../hook/useAuthProvider';
import UserAfterLogin from './UserAfterLogin';
import UserBeforLogin from './UserBeforLogin';

export default function User() {
	const [authState, authDispatch] = useAuthProvider();
	const { data, loading } = useQuery(GET_USER_INFO, {
		variables: { id: authState.user.id },
	});
	if (loading) {
		return <h1>Loading..</h1>;
	}
	const isAuth =
		authState.auth || window.localStorage.getItem('auth') === 'true';

	const username = authState.user.username;

	const avatarSrc =
		window.localStorage.getItem('avatarSrc') !== 'undefined'
			? data.slekret_users[0]?.avatar_src ||
			  authState.user.avatar_src ||
			  window.localStorage.getItem('avatarSrc')
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

const GET_USER_INFO = gql`
	query MyQuery($id: uuid) {
		slekret_users(where: { id: { _eq: $id } }) {
			avatar_src
		}
	}
`;
