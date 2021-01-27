import { useState } from 'react';
import IconBook from '../../../icons/ic_book';
import IconHeart from '../../../icons/ic_heart';
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
	};

	return (
		<div className="w-full">
			<div className="group w-full relative">
				<div className="w-full relative" style={{ paddingTop: '75%' }}>
					<div
						className="absolute inset-0 bg-red-500 bg-cover bg-no-repeat"
						style={{ backgroundImage: `url(${article_cover})` }}
					/>
				</div>
				<div
					className="group-hover:opacity-100 opacity-0 bg-black bg-opacity-40 absolute top-0 w-full h-full flex justify-center items-center transition-opacity duration-500"
					// style={{ boxShadow: 'inset 0 0 60px 60px rgba(0,0,0,0.25)' }}
				>
					<div className="flex select-none">
						<div className="mr-6 flex items-center text-white">
							<div onClick={likeArticle}>
								<IconHeart className="w-6 h-6" filled={isLiked} />
							</div>
							<p className="font-medium">{likes}</p>
						</div>
						<div className="flex items-center text-white">
							<IconBook className="w-6 h-6" />
							<p className="font-medium">5 m</p>
						</div>
					</div>
				</div>
			</div>
			<PostTags tags={blog_article_tags} extendedParentClassName="mt-3" />
			<Link
				to={{
					pathname: `/blog/${id}/${title.split(' ').join('-')}`,
					state: { blogDetail },
				}}
				className="my-2 text-2xl text-gray-600 font-semibold leading-6"
			>
				{title}
			</Link>
			<p
				style={{
					overflow: 'hidden',
					whiteSpace: 'normal',
					display: '-webkit-box',
					WebkitLineClamp: '5',
					WebkitBoxOrient: 'vertical',
				}}
				className="text-gray-500 tracking-wide"
			>
				{content}
			</p>

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
