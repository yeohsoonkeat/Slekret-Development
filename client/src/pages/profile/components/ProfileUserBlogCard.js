import { Link } from 'react-router-dom';
import IconComment from '../../../icons/ic_comment';
import ProfileUserBlogMenu from './ProfileUserBlogMenu';

export default function ProfileUserBlogCard({ blog }) {
	return (
		<>
			<div className="mt-10 relative">
				<div className="p-5 border-2 mt-4 shadow">
					<div className="flex justify-between">
						<div className="flex flex-1">
							<div>
								<img
									src={blog.slekret_user.avatar_src}
									alt=""
									className="h-10 w-10 object-center object-cover rounded-full ring-1"
								/>
							</div>

							<div className="ml-3">
								<h1>{blog.slekret_user.displayname}</h1>
								<p className="text-gray-400">
									{new Date(blog.created_at).toDateString()}
								</p>
							</div>
						</div>
					</div>
					<div>
						<Link
							to={`/blog/${blog.id}/${blog.title.split(' ').join('-')}`}
							className="text-3xl md:text-4xl font-black mt-5"
						>
							{blog.title}
						</Link>
						{/* tags */}
						<div className="flex text-gray-500 mt-5 flex-wrap">
							{blog.blog_article_tags &&
								blog.blog_article_tags.map((tag, index) => {
									return <span className="mr-3"># {tag.tag_name}</span>;
								})}
						</div>
						<div className="mt-5 flex">
							<div className="flex mr-5">
								<IconComment className="w-6 h-6" />
								<span className="ml-2">
									{blog.blog_article_comments_aggregate.aggregate.count}{' '}
									comments
								</span>
							</div>
							{/* <div className="flex">
								<IconThumbUp className="w-6 h-6" />
								<span className="ml-2">0 Likes</span>
							</div> */}
						</div>
					</div>
				</div>
				<ProfileUserBlogMenu blog={blog} />
			</div>
		</>
	);
}
