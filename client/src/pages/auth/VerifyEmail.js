import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import IconLeft from '../../icons/ic_left';
import ApiService from '../../service/api';
import staticContent from './constant/verifyEmail';

const api = new ApiService();

export default function VerifyEmail() {
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const location = useLocation();
	const history = useHistory();

	if (!location.state) {
		history.push('/auth/signup');
	}

	const user = location.state.user;
	const verifyPath = location.state.verifyPath;

	const resendEmail = async () => {
		if (window.localStorage.getItem('auth') === 'true') {
			history.push('/');
		}

		setLoading(true);
		const res = await api.register(verifyPath, user);
		setEmailSent(res?.data?.emailSent);
		setLoading(false);
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<h1 className="text-sm text-gray-500">{staticContent.greeting}</h1>
			<img
				src={process.env.PUBLIC_URL + '/assets/mail.svg'}
				alt=""
				className="w-96 mt-5 mb-5"
			/>

			<h1 className="text-3xl text-center">{staticContent.title}</h1>
			<p className="text-gray-500 mt-5 text-center">{staticContent.desc}</p>
			<div className="flex flex-col-reverse md:flex-row items-center mt-5">
				<Link
					to={location.state.prevPath}
					className=" mt-5 md:mt-0 flex px-10 py-3"
				>
					<IconLeft className="w-6 h-6" filled />
					{staticContent.buttonBackText}
				</Link>

				{emailSent ? (
					<button
						className={` px-10 py-3 ring-1 ring-blue-500 rounded hover:tracking-wider transition-all hover:shadow-inner focus:outline-none `}
					>
						Sent
					</button>
				) : (
					<button
						onClick={resendEmail}
						className={` ${
							loading ? 'animate-pulse' : ''
						} px-10 py-3 bg-blue-500 text-white rounded hover:tracking-wider transition-all hover:shadow-inner focus:outline-none `}
					>
						Resent
					</button>
				)}
			</div>
		</div>
	);
}
