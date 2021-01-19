import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ActionButtons from './ActionButtons';
import UserAvatar from './UserAvatar';
import formatDistance from 'date-fns/formatDistance';
import numeral from 'numeral';

const Reply = ({ reply, hasNext }) => {
  const { author } = reply;

  return (
    <div className="flex items-stretch">
      <div className="flex flex-col items-center">
        <Link to={`/@${author.username}`} className="z-10">
          <UserAvatar src={author.username} />
        </Link>
        {hasNext && <div className="flex-1 border"></div>}
      </div>

      <div className="ml-4">
        <div className="flex items-center">
          <p className="text-base font-bold tracking-normal text-gray-800">
            {author.display_name}
          </p>
          <span className="mx-3">&middot;</span>
          <p className="text-xs font-medium text-gray-400">
            {formatDistance(reply.published_date, new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="text-xs font-medium text-gray-400 select-none">
          Reply to{' '}
          <Link to={`/@${reply.reply_to_user.username}`}>
            <p className="hover:text-gray-800 hover:cursor-pointer inline-block">
              {reply.reply_to_user.display_name}
            </p>
          </Link>
          's{' '}
          <p
            className="hover:text-gray-800 hover:cursor-pointer inline-block"
            onClick={() => {
              console.log(reply.reply_to_id);
              window.scrollTo(0, 0);
            }}
          >
            comment
          </p>
        </div>

        <div className="pt-2 pb-6">
          <ReactMarkdown plugins={[remarkGfm]}>{reply.content}</ReactMarkdown>
          <div className="mt-2">
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
