import '../styles/blogStyle.css';
import BlogCommentMenu from './BlogCommentMenu';

export default function BlogComment({ comment }) {
	return (
		<>
			<div className="border p-5 rounded mt-5 relative">
				<div className="mt-5 flex items-center mb-5 ">
					<img
						src={comment.slekret_user.avatar_src}
						alt={comment.slekret_user.username}
						className="rounded-full h-12 w-12"
					/>
					<div className="ml-4">
						<a
							href={`@${comment.slekret_user.username}}`}
							className="font-semibold hover:text-blue-800 hover:font-semibold hover:tracking-wide hover:cursor-pointer transition-all "
						>
							{comment.slekret_user.displayname}
						</a>
						<div className="flex">
							<p
								className="py-1 text-gray-600 text-sm"
								style={{ lineHeight: '0.75rem' }}
							>
								{new Date(comment.created_at).toDateString()}
							</p>
						</div>
					</div>
				</div>
				<p className="ml-16 text-xl"> {comment.content}</p>

				<BlogCommentMenu userId={comment.slekret_user.id} />
			</div>
		</>
	);
}
