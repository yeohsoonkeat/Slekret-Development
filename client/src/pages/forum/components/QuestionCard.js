import { Link } from 'react-router-dom';
import IconComment from '../../../icons/ic_comment';
import IconThumbUp from '../../../icons/ic_thumb_up';
import random_numbers from '../utils/random_numbers';
const colors = ['pink', 'blue', 'green', 'yellow', 'indigo'];

const QuestionCard = (props) => {
  const { item, current_url } = props;

  const { id, title,content, created_at, slekret_user, forum_tags, forum_question_votes_aggregate, forum_replies_aggregate } = item
  const { avatar_src, displayname, username } = slekret_user
  const posted_date = new Date(created_at)
  const votes = forum_question_votes_aggregate.aggregate.count
  const replies = forum_replies_aggregate.aggregate.count
  const tagRandomIndexes = random_numbers(forum_tags.length);
  
  return (
    <div className="bg-white shadow-sm rounded-lg px-6 py-4">
      <div className="flex-1 border-b">
        <Link
          to={`${current_url}/${id}/${title
            .toLowerCase()
            .split(' ')
            .join('-')}`}
        >
          <p className="text-xl font-medium">{title}</p>
        </Link>
        <div className="flex mt-1">
          {forum_tags.map((tag, index) => {
            const randomColor = colors[tagRandomIndexes[index] % colors.length];

            return (
              <span
                key={index}
                className={`${
                  index !== 0 && 'ml-2'
                } px-2 py-1 select-none rounded-md text-xs uppercase font-medium tracking-wider bg-${randomColor}-200 text-${randomColor}-700`}
              >
                {tag.tag.tag_name}
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
          {content}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <Link to={`@${username}`} className="flex items-center">
          <div
            className="w-10 h-10 rounded-full bg-blue-500 bg-cover"
            style={{ backgroundImage: `url(${avatar_src})` }}
          />
          <div className="text-gray-500 ml-3 text-sm font-medium select-none">
            <span className="hidden md:inline-block mr-1">Posted by</span>
            <span className="text-blue-500 hover:text-blue-800 font-medium">
              {displayname}
            </span>
            <span className="mx-3 hidden md:inline-block">&middot;</span>
            <span className="text-xs block md:inline-block">{posted_date.toDateString()}</span>
          </div>
        </Link>

        <div className="text-sm font-medium select-none flex items-center space-x-6 md:space-x-10">
          <div className="flex items-center text-gray-500">
            <IconThumbUp className="w-6 h-6"/>
            <span className="mx-1">{votes}</span>
            <span className="hidden md:inline-block">votes</span>
          </div>

          <div className="flex items-center text-gray-500">
            <IconComment className="w-6 h-6" />
            <span className="mx-1">{replies}</span>
            <span className="hidden md:inline-block">answers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
