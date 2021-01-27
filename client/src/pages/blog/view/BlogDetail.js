import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownPreview from '../components/MarkdownPreview';
import PostTags from '../components/PostTags';

export default function BlogDetail({ location }) {
	useEffect(() => {
		if (location.state) {
			window.scrollTo(0, 0);
		}
	});
	const { id } = useParams();
	let blogDetail = location.state?.blogDetail;

	const { loading, data, error } = useQuery(GET_BLOG_DETAIL, {
		variables: {
			id,
		},
		skip: location.state,
	});

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>error</h1>;
	}
	if (data) {
		blogDetail = data?.blog_articles[0];
	}

	return (
		<>
			<div
				className="min-h-screen mt-5 rounded  mx-auto"
				style={{
					maxWidth: '900px',
				}}
			>
				<div>
					{blogDetail.article_cover && (
						<div className="h-80 w-full">
							<img
								src={blogDetail.article_cover}
								alt=""
								className="h-full w-full object-cover object-center"
							/>
						</div>
					)}
					<div className="p-5">
						<h1 className="font-black text-5xl">{blogDetail.title}</h1>
						<PostTags
							tags={blogDetail.blog_article_tags}
							extendedParentClassName="mt-5"
						/>
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
										published on{' '}
										{new Date(blogDetail.created_at).toDateString()}
									</p>
								</div>
							</div>
						</div>
						<MarkdownPreview content={blogDetail.content} />
					</div>
					<hr className="mt-10 mb-10" />
					<div className="w-11/12 mx-auto mb-10">
						<h1 className="text-2xl font-black mb-5">Comment</h1>
						<textarea
							className="h-56 w-full mx-auto resize-none p-5 border rounded shadow"
							placeholder="leave a comment here"
						/>
						<div>
							<button className="bg-blue-500 py-3 px-5 uppercase text-white font-bold rounded">
								Add Comment
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const GET_BLOG_DETAIL = gql`
	query MyQuery($id: uuid) {
		blog_articles(where: { id: { _eq: $id } }) {
			article_cover
			content
			created_at
			title
			slekret_user {
				avatar_src
				displayname
				username
			}
			blog_article_tags {
				tag_name
			}
		}
	}
`;
