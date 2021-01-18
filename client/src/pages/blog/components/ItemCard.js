import { useState } from 'react';
import IconBook from '../../../icons/ic_book';
import IconHeart from '../../../icons/ic_heart';
import PostTags from './PostTags';
import UserInfo from './UserInfo';

const ItemCard = ({ item }) => {
	const {
		image,
		tags,
		title,
		description,
		avatar,
		username,
		display_name,
		published_date,
		is_liked,
		likes,
		read_duration,
	} = item;

	const [isLiked, setIsLiked] = useState(is_liked);

	return (
		<div className="w-full">
			<div className="group w-full relative">
				<div className="w-full relative" style={{ paddingTop: '75%' }}>
					<div
						className="absolute inset-0 bg-red-500 bg-cover bg-no-repeat"
						style={{ backgroundImage: `url(${image})` }}
					/>
				</div>
				<div
					className="group-hover:opacity-100 opacity-0 bg-black bg-opacity-40 absolute top-0 w-full h-full flex justify-center items-center transition-opacity duration-500"
					// style={{ boxShadow: 'inset 0 0 60px 60px rgba(0,0,0,0.25)' }}
				>
					<div className="flex select-none">
						<div className="mr-6 flex items-center text-white">
							<div onClick={() => setIsLiked(!isLiked)}>
								<IconHeart className="w-6 h-6" filled={isLiked} />
							</div>
							<p className="font-medium">{likes}</p>
						</div>
						<div className="flex items-center text-white">
							<IconBook className="w-6 h-6" />
							<p className="font-medium">{read_duration}</p>
						</div>
					</div>
				</div>
			</div>
			<PostTags tags={tags} extendedParentClassName="mt-3" />
			<p className="my-2 text-2xl text-gray-600 font-semibold leading-6">
				{title}
			</p>
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
				{description}
			</p>

			<UserInfo user={{ avatar, display_name, username, published_date }} />
		</div>
	);
};

export default ItemCard;
