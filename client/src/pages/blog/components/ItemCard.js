import { useState } from 'react';
import IconBook from '../../../icons/ic_book';
import IconHeart from '../../../icons/ic_heart';
import PostTags from './PostTags';
import UserInfo from './UserInfo';

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
  } = item;
  const { avatar_src, displayname, username } = slekret_user;
  const posted_date = new Date(created_at);
  const likes = blog_article_likes_aggregate.aggregate.count;

  const [isLiked, setIsLiked] = useState(false);

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
              <div onClick={() => setIsLiked(!isLiked)}>
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
        {content}
      </p>

      <UserInfo user={{ avatar_src, displayname, username, posted_date }} />
    </div>
  );
};

export default ItemCard;
