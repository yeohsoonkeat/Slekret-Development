const IconPreview = ({ filled, strokeWidth, className }) => {
	if (filled) {
		return (
			<svg
				className={className}
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
				<path
					fillRule="evenodd"
					d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
					clipRule="evenodd"
				></path>
			</svg>
		);
	}

	return (
		<svg
			class={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			></path>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
			></path>
		</svg>
	);
};

export default IconPreview;
