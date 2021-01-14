import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ActionButtons from './ActionButtons';

const Reply = (props) => {
  const {
    hasNext,
    avatar,
    display_name,
    username,
    publish_date,
    content,
  } = props;

  return (
    <div className="flex items-stretch">
      <div className="flex flex-col items-center">
        <Link to={`/@${username}`} className="z-10">
          <div
            className="w-12 h-12 rounded-full bg-cover"
            style={{ backgroundImage: `url(${avatar})` }}
          />
        </Link>
        {hasNext && <div className="flex-1 border"></div>}
      </div>

      <div className="ml-4">
        <div className="flex items-center">
          <p className="text-base font-bold tracking-normal text-gray-800">
            {display_name}
          </p>
          <span className="mx-3">&middot;</span>
          <p className="text-xs font-medium text-gray-400">{publish_date}</p>
        </div>
        <div className="text-xs font-medium text-gray-400 select-none">
          Reply to{' '}
          <p className="hover:text-gray-800 hover:cursor-pointer inline-block">
            Justin Beiber
          </p>
          's{' '}
          <p
            className="hover:text-gray-800 hover:cursor-pointer inline-block"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            comment
          </p>
        </div>

        <div className="pt-2 pb-6">
          <ReactMarkdown plugins={[remarkGfm]}>{content}</ReactMarkdown>
          <div className="mt-2">
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
