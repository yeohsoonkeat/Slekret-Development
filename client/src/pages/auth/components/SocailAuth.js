import React from 'react'

export default function SocailAuth({ githubAuth }) {
	return (
		<>
			<div className="btn-wrapper text-center" onClick={githubAuth}>
				<button className="btn-login-socail mr-2" type="button">
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
