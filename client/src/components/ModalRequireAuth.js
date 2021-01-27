import React from 'react';
import { Link } from 'react-router-dom';
import IconClose from '../icons/ic_close';

export default function ModalRequireAuth({ setShowModal }) {
	return (
		<div
			className="fixed h-full w-full top-0 left-0 flex items-center justify-center"
			style={{
				backgroundColor: 'rgba(0,0,0,0.6)',
			}}
		>
			<div className="w-96 bg-white h-96 rounded p-5 flex flex-col items-center justify-center relative">
				<h1 className="text-3xl font-black">Sign in to continue</h1>
				<Link
					to="/auth/signin"
					className="bg-blue-500 text-white block text-center mt-5 py-4 rounded uppercase hover:tracking-wide transition-all w-full"
				>
					Sigin
				</Link>

				<Link
					to="/auth/signup"
					className=" block text-center mt-5  rounded uppercase hover:tracking-wide transition-all w-full hover:underline"
				>
					Create an account
				</Link>
				<div
					className="absolute top-5 right-5"
					onClick={() => setShowModal(false)}
				>
					<IconClose className="w-6 h-6 cursor-pointer hover:scale-105 transition-all transform" />
				</div>
			</div>
		</div>
	);
}
