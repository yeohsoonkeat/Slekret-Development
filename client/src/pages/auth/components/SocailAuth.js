import React from 'react'

export default function SocailAuth() {
	return (
		<>
			<div className="btn-wrapper text-center">
				<button className="btn-login-socail mr-2" type="button">
					<img
						alt="github"
						className="w-5 mr-1"
						src={process.env.PUBLIC_URL + '/assets/github.svg'}
					/>
					Github
				</button>
				{/* mr */}
				<button className="btn-login-socail mr-1" type="button">
					<img
						alt="..."
						className="w-5 mr-1"
						src={process.env.PUBLIC_URL + '/assets/google.svg'}
					/>
					Google
				</button>
			</div>
		</>
	)
}
