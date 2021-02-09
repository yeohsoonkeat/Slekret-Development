import React from 'react';

export default function ProfileNavigation({ isBlog, setShowBlog }) {
	return (
		<div>
			<div className="flex justify-between items-center bg-gray-300 p-1 mt-5 md:mt-10 rounded">
				<span
					className={`text-center flex-1 ${
						isBlog ? 'bg-white' : ''
					} p-2 rounded cursor-pointer`}
					onClick={() => setShowBlog(true)}
				>
					Blog
				</span>
				<span
					className={`text-center flex-1 ${
						!isBlog ? 'bg-white' : ''
					} p-2 rounded cursor-pointer transition-all`}
					onClick={() => setShowBlog(false)}
				>
					Questions
				</span>{' '}
			</div>
		</div>
	);
}
