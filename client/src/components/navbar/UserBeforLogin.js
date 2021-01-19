import React from 'react';
import { Link } from 'react-router-dom';
import IconUser from '../../icons/ic_user';

export default function UserBeforLogin() {
	return (
		<Link
			to="/auth/signin"
			className="flex text-white items-center hover:tracking-wider 
            transition-all"
		>
			<IconUser filled className="w-8 h-8" />
			<span className="hidden sm:block">Account</span>
		</Link>
	);
}
