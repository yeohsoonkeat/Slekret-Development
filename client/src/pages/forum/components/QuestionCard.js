import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconComment from '../../../icons/ic_comment';
import IconThumbDown from '../../../icons/ic_thumb_down';
import IconThumbUp from '../../../icons/ic_thumb_up';
import random_numbers from '../utils/random_numbers';

const actionLiked = 'liked';
const actionDisliked = 'disliked';
const colors = ['pink', 'blue', 'green', 'yellow', 'indigo'];

const QuestionCard = (props) => {
  const { item, current_url } = props;

  const {
    id,
    previousAction,
    votes,
    title,
    tags,
    description,
    avatar,
    display_name,
    username,
    posted_date,
    comments,
  } = item;

  const [currentVotes, setCurrentVotes] = useState(votes || 0);
  const [action, setAction] = useState(previousAction);

  const tagRandomIndexes = random_numbers(tags.length);

  return (
    <div className="bg-white shadow-sm flex rounded-lg">
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
          <Link
            to={`${current_url}/${id}/${title
              .toLowerCase()
              .split(' ')
              .join('-')}`}
          >
            <p className="text-xl font-medium">{title}</p>
          </Link>
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
          <Link to={`@${username}`} className="flex items-center">
            <div
              className="w-10 h-10 rounded-full bg-blue-500 bg-cover"
              style={{ backgroundImage: `url(${avatar})` }}
            />
            <div className="text-gray-500 ml-3 text-sm font-medium select-none">
              <span className="hidden md:inline-block mr-1">Posted by</span>
              <span className="text-blue-800">{display_name}</span>
              <span className="mx-3 hidden md:inline-block">&middot;</span>
              <span className="text-xs block md:inline-block">
                {posted_date}
              </span>
            </div>
          </Link>

          <div className="text-gray-500 hover:text-gray-800 hover:cursor-pointer text-sm font-medium select-none flex items-center">
            <IconComment className="w-6 h-6" />
            <span className="mx-1">{comments}</span>
            <span className="hidden md:inline-block">comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
