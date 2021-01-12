import React, { useState } from 'react';
import IconComment from '../../../icons/ic_comment';
import IconThumbDown from '../../../icons/ic_thumb_down';
import IconThumbUp from '../../../icons/ic_thumb_up';
import random_numbers from '../utils/random_numbers';

const actionLiked = 'liked';
const actionDisliked = 'disliked';
const colors = ['pink', 'blue', 'green', 'yellow', 'indigo'];

const ItemCard = ({ item }) => {
  const {
    previousAction,
    votes,
    title,
    tags,
    description,
    avatar,
    username,
    profile_url,
    posted_date,
    comments,
  } = item;

  const [currentVotes, setCurrentVotes] = useState(votes || 0);
  const [action, setAction] = useState(previousAction);

  const tagRandomIndexes = random_numbers(tags.length);

  return (
    <div className="ml-4 bg-white shadow-sm flex rounded-lg">
      {/* Votes */}
      <div className="flex flex-col items-center p-6">
        <div
          onClick={() => {
            if (action !== actionLiked) {
              setAction(actionLiked);
              setCurrentVotes(currentVotes + 1);
            }
          }}
        >
          <IconThumbUp
            className={`w-6 h-6 ${action === actionLiked && 'text-blue-600'}`}
            filled={action === actionLiked}
          />
        </div>

        <span
          className={`select-none ${action && 'font-bold'} ${
            action === actionLiked && 'text-blue-600'
          } ${action === actionDisliked && 'text-red-600'}`}
        >
          {currentVotes}
        </span>

        <div
          onClick={() => {
            if (action !== actionDisliked) {
              setAction(actionDisliked);
              setCurrentVotes(currentVotes - 1);
            }
          }}
        >
          <IconThumbDown
            className={`w-6 h-6 ${action === actionDisliked && 'text-red-600'}`}
            filled={action === actionDisliked}
          />
        </div>
      </div>

      <div className="ml-2 mr-12">
        <div className="flex-1 border-b mt-6">
          <p className="text-xl font-medium">{title}</p>
          <div className="flex mt-1">
            {tags.map((tag, index) => {
              const randomColor =
                colors[tagRandomIndexes[index] % colors.length];

              return (
                <span
                  key={index}
                  className={`${
                    index !== 0 && 'ml-2'
                  } px-2 py-1 select-none rounded-md text-xs uppercase font-medium tracking-wider bg-${randomColor}-200 text-${randomColor}-700`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'normal',
              display: '-webkit-box',
              WebkitLineClamp: '5',
              WebkitBoxOrient: 'vertical',
            }}
            className="text-gray-500 my-3 tracking-wide"
          >
            {description}
          </div>
        </div>

        <div className="mt-2 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-full bg-blue-500 bg-cover"
              style={{
                backgroundImage: `url(${avatar})`,
              }}
            />
            <p className="text-gray-500 ml-3 text-sm font-medium select-none">
              <span>Posted by </span>
              <a href={profile_url} className="text-blue-800">
                {username}
              </a>
              <span className="mx-3">&middot;</span>
              <span className="text-xs">{posted_date}</span>
            </p>
          </div>

          <div>
            <IconComment className="w-6 h-6 text-gray-500 inline" />
            <span className="ml-1 text-gray-500 hover:text-gray-800 text-sm font-medium select-none">
              {comments} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
