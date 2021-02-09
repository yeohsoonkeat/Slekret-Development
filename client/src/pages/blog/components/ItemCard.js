import { useState } from 'react';
import ReactMarkDown from 'react-markdown';

import PostTags from './PostTags';
import UserInfo from './UserInfo';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
	const {
		id,
		title,
		content,
		article_cover,
		created_at,
		slekret_user,
		blog_article_likes_aggregate,
		blog_article_tags,
		blog_article_likes,
		blog_reading_list_entries,
		blog_article_comments_aggregate,
	} = item;
	const { avatar_src, displayname, username } = slekret_user;
	const [likes, setLikes] = useState(
		blog_article_likes_aggregate.aggregate.count
	);

	const [isLiked, setIsLiked] = useState(
		blog_article_likes[0] ? blog_article_likes[0].is_liked : false
	);
	const [likeArticle] = useMutation(LIKE_ARTICLE_MUTATION, {
		variables: { is_liked: !isLiked, blog_article_id: id },
		onCompleted(data) {
			let liked = data.insert_blog_article_likes_one.is_liked;
			setIsLiked(liked);
			setLikes(liked ? likes + 1 : likes - 1);
		},
	});

	const blogDetail = {
		title,
		content,
		article_cover,
		slekret_user,
		blog_article_tags,
		created_at,
		blog_article_comments_aggregate,
	};

	return (
		<div className="w-11/12 mx-auto border-2 mt-5 p-5 rounded">
			<PostTags tags={blog_article_tags} extendedParentClassName="mt-3 mb-5" />
			<Link
				to={{
					pathname: `/blog/${id}/${title.split(' ').join('-')}`,
					state: { blogDetail },
				}}
				className="text-3xl font-black"
			>
				{title}
			</Link>

			<ReactMarkDown
				source={content}
				allowedTypes={['paragraph', 'text']}
				className="text-gray-500 tracking-wide mt-5  h-24 overflow-hidden overflow-ellipsis ... "
			/>

			<UserInfo
				user={{
					avatar_src,
					displayname,
					username,
					created_at,
					blog_reading_list_entries,
				}}
			/>
		</div>
	);
};

const LIKE_ARTICLE_MUTATION = gql`
	mutation MyMutation($blog_article_id: uuid, $is_liked: Boolean) {
		insert_blog_article_likes_one(
			object: { is_liked: $is_liked, blog_article_id: $blog_article_id }
			on_conflict: {
				constraint: blog_article_likes_pkey
				update_columns: is_liked
			}
		) {
			is_liked
		}
	}
`;

export default ItemCard;
