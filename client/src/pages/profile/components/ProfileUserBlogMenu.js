import { Link } from 'react-router-dom';
import useAuthProvider from '../../../hook/useAuthProvider';
import IconDotHorizontal from '../../../icons/ic_dothorizontal';

export default function ProfileUserBlogMenu({ blog }) {
	const [authState] = useAuthProvider();
	const isThisCommentBelongtoCurrentUser =
		authState.user.id === blog.slekret_user.id;

	const blogInfo = {
		title: blog.title,
		content: blog.content,
		tags: blog.blog_article_tags.map((tag) => tag.tag_name),
		articleCover: blog.article_cover,
	};

	return (
		<>
			<div className="absolute top-5 right-5 hover:bg-gray-200 transition-all cursor-pointer rounded-full z-20">
				<div className="relative hover-dropdown">
					<IconDotHorizontal className="w-8 h-8 p-1 " filled />
					<div className="w-56 shadow-2xl border bg-white rounded absolute right-0 hidden dropdown py-5">
						{isThisCommentBelongtoCurrentUser && (
							<>
								<Link
									to={{
										pathname: '/blog/edit',
										state: { blog: blogInfo, blogId: blog.id },
									}}
									className="p-2 hover:bg-gray-100 hover:text-blue-400 hover:tracking-wide transition-all block"
								>
									Edit
								</Link>
								<Link
									to={{
										pathname: `/blog/delete_confirm/${blog.id}/${blog.title}`,
										state: { username: blog.slekret_user.username },
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
