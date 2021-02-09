import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import useAuthProvider from '../../../hook/useAuthProvider';
import BlogComments from '../components/BlogComments';
import MarkdownPreview from '../components/MarkdownPreview';
import PostTags from '../components/PostTags';

export default function BlogDetail({ location }) {
	const [authState] = useAuthProvider();
	useEffect(() => {
		if (location.state) {
			window.scrollTo(0, 0);
		}
	});
	const { id } = useParams();

	const { loading, data, error } = useQuery(GET_BLOG_DETAIL, {
		variables: {
			id,
		},
	});

	if (loading) {
		return <Loading/>;
	}

	if (error) {
		return <h1>error</h1>;
	}
	const blogDetail = data?.blog_articles[0];

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
						<div>
							<div className="mt-5 flex items-center mb-10">
								<img
									src={
										blogDetail.slekret_user.avatar_src ||
										process.env.PUBLIC_URL + '/assets/default_avatar.png'
									}
									alt={blogDetail.slekret_user.username}
									className="rounded-full h-12 w-12 object-center object-cover"
								/>
								<div className="ml-4">
									<Link
										to={`/user/${blogDetail.slekret_user.username}`}
										className="font-bold hover:text-blue-800 hover:font-semibold hover:tracking-wide hover:cursor-pointer transition-all "
									>
										{blogDetail.slekret_user.displayname}
									</Link>
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

								<div className="ml-2">
									{blogDetail.slekret_user.id === authState.user.id ? (
										<div>
											<Link
												to={{
													pathname: '/blog/edit',
													state: {
														blog: {
															title: blogDetail.title,
															content: blogDetail.content,
															articleCover: blogDetail.article_cover,
															tags: blogDetail.blog_article_tags
																.map((tag) => tag.tag_name)
																.join(','),
														},
														blogId: blogDetail.id,
													},
												}}
												className="bg-gray-200 px-5 py-2 rounded mr-2"
											>
												Edit
											</Link>
											<Link
												to={{
													pathname: `/blog/delete_confirm/${
														blogDetail.id
													}/${blogDetail.title.split(' ').join('-')}`,
													state: { username: blogDetail.slekret_user.username },
												}}
												className=" mr-2 bg-red-500 text-white px-5 py-2 rounded"
											>
												Delete
											</Link>
										</div>
									) : (
										''
									)}
								</div>
							</div>
						</div>
						<MarkdownPreview content={blogDetail.content} />
					</div>
					<hr className="mt-10 mb-10" />
					<BlogComments
						blogId={id}
						numberOfComments={
							blogDetail.blog_article_comments_aggregate?.aggregate.count || 0
						}
					/>
				</div>
			</div>
		</>
	);
}

const GET_BLOG_DETAIL = gql`
	query MyQuery($id: uuid) {
		blog_articles(where: { id: { _eq: $id } }) {
			id
			article_cover
			content
			created_at
			title
			slekret_user {
				id
				avatar_src
				displayname
				username
			}
			blog_article_tags {
				tag_name
			}
			blog_article_comments_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`;
