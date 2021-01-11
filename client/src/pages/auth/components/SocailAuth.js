import React from 'react'

export default function SocailAuth({ githubAuth }) {
	return (
		<>
			<div className="btn-wrapper text-center" onClick={githubAuth}>
				<button
					className="bg-white text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150 mr-2"
					type="button"
				>
					<img
						alt="github"
						className="w-5 mr-1"
						src={process.env.PUBLIC_URL + '/assets/github.svg'}
					/>
					Github
				</button>
			</div>
		</>
	)
}
