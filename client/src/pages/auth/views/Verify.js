import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export default function Verify() {
	const location = useLocation()
	const history = useHistory()
	const [isResent, setIsResent] = useState(false)
	// if (!location.state) {
	// 	history.push('/auth/register')
	// }
	const resentVerifyEmail = async () => {
		setIsResent(true)
		await axios
			.post('http://localhost:8000/auth/register', location.state?.data, {
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
			.catch((er) => console.log(er))
	}
	return (
		<div className="text-white w-full text-center md:text-left bg-gray-900 p-5 md:w-4/12 font-inter">
			<h1 className="font-bold text-4xl lg:text-5xl">
				Thanks! Now check your email.
			</h1>
			<p className="text-xl mt-5">
				You should get a confirmation email soon, open it up and click the
				confirm email link so you are verify.
			</p>
			{isResent ? (
				<h1 className="mt-5 px-6 py-3 rounded ">Sent</h1>
			) : (
				<button
					onClick={resentVerifyEmail}
					className="px-6 text-white rounded mt-5 py-3 bg-blue-500"
				>
					Resent
				</button>
			)}
		</div>
	)
}
