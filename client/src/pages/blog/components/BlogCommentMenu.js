import React from 'react';
import { Link } from 'react-router-dom';
import useAuthProvider from '../../../hook/useAuthProvider';
import IconDotHorizontal from '../../../icons/ic_dothorizontal';

export default function BlogCommentMenu({ userId, comment, blog }) {
	const [authState] = useAuthProvider();
	const isThisCommentBelongtoCurrentUser = authState.user.id === userId;
	return (
		<>
			<div className="absolute top-5 right-5 hover:bg-gray-200 transition-all cursor-pointer rounded-full z-20">
				<div className="relative hover-dropdown">
					<IconDotHorizontal className="w-8 h-8 p-1 " filled />
					<div className="w-56 shadow-2xl border bg-white rounded absolute right-0 hidden dropdown py-5">
						{isThisCommentBelongtoCurrentUser && (
							<>
								<p className="p-2 hover:bg-gray-100 hover:text-blue-400 hover:tracking-wide transition-all">
									Edit
								</p>
								<Link
									to={{
										pathname: `/blog/delete_confirm/comment/${comment.id}/${comment.content}`,
										state: { blog },
									}}
									className="p-2 hover:bg-gray-100 hover:text-blue-400 hover:tracking-wide transition-all block"
								>
									Delete
								</Link>
							</>
						)}

						<p className="p-2 hover:bg-gray-100 hover:text-blue-400 hover:tracking-wide transition-all">
							Report
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
