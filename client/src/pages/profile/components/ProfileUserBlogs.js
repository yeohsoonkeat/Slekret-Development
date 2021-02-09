import { gql, useQuery } from '@apollo/client';
import React from 'react';
import ProfileUserBlogCard from './ProfileUserBlogCard';

export default function ProfileUserBlogs({ username }) {
	const { data, loading, error } = useQuery(GET_USER_BLOGS, {
		variables: { username },
	});
	if (loading) {
		return <h1>Loading...</h1>;
	}
	if (error) {
		return <h1>Error</h1>;
	}

	return (
		<>
			{data.blog_articles.map((blog, index) => {
				return (
					<div key={index}>
						<ProfileUserBlogCard blog={blog} />
					</div>
				);
			})}
		</>
	);
}

const GET_USER_BLOGS = gql`
	query MyQuery($username: String) {
		blog_articles(where: { slekret_user: { username: { _eq: $username } } }) {
			id
			title
			content
			created_at
			article_cover
			blog_article_comments_aggregate {
				aggregate {
					count
				}
			}
			slekret_user {
				username
				displayname
				avatar_src
				id
			}
			blog_article_likes_aggregate {
				aggregate {
					count
				}
			}
			blog_article_tags {
				tag_name
			}
		}
	}
`;
