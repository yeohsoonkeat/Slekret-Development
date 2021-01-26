import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownPreview from '../components/MarkdownPreview';
import PostTags from '../components/PostTags';

export default function BlogDetail({ location }) {
	const { id } = useParams();
	const { blogDetail } = location.state;

	useEffect(() => {
		if (location.state) {
			window.scrollTo(0, 0);
		}
	});

	return (
		<div
			className="min-h-screen mt-5 rounded  mx-auto"
			style={{
				maxWidth: '900px',
			}}
		>
			<div className="h-80 w-full">
				<img
					src={blogDetail.articleCover}
					alt=""
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<div className="p-5">
				<h1 className="font-black text-5xl">{blogDetail.title}</h1>
				<PostTags tags={blogDetail.tags} extendedParentClassName="mt-5" />
				<div className="mt-5 flex items-center mb-10">
					<img
						src={blogDetail.slekret_user.avatar_src}
						alt={blogDetail.slekret_user.username}
						className="rounded-full h-12 w-12"
					/>
					<div className="ml-4">
						<a
							href={`@${blogDetail.slekret_user.username}}`}
							className="font-bold hover:text-blue-800 hover:font-semibold hover:tracking-wide hover:cursor-pointer transition-all "
						>
							{blogDetail.slekret_user.displayname}
						</a>
						<div className="flex">
							<p
								className="py-1 text-gray-600 text-sm"
								style={{ lineHeight: '0.75rem' }}
							>
								published on {new Date(blogDetail.created_at).toDateString()}
							</p>
						</div>
					</div>
				</div>
				<MarkdownPreview content={blogDetail.content} />
			</div>
		</div>
	);
}
