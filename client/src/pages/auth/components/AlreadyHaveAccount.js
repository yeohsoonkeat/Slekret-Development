import React from 'react'
import { Link } from 'react-router-dom'

export default function AlreadyHaveAccount() {
	return (
		<div className="flex flex-wrap mt-6 relative text-xl">
			<div className="w-full text-center">
				<Link to="/auth/login" className="text-gray-300">
					<small className="underline">Already have an account?</small>
				</Link>
			</div>
		</div>
	)
}
