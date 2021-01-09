import { Link } from 'react-router-dom'

export default function Expired() {
	return (
		<div className="h-96 w-96 bg-white rounded flex items-center justify-center flex-col">
			<svg
				class="w-32 h-32"
				fill="none"
				stroke="red"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
			<h1 className="text-2xl">Verify token is expired</h1>
			<Link className="underline mt-5" to="/auth/register">
				Go back to register
			</Link>
		</div>
	)
}
