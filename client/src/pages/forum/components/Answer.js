import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import IconArrowNarrowDown from '../../../icons/ic_arrow_narrow_down';
import IconArrowNarrowUp from '../../../icons/ic_arrow_narrow_up';
import Reply from './Reply';

const actionUpVoted = 'up_voted';
const actionDownVoted = 'down_voted';

const Answer = ({ reply,replyLength , replies}) => {
  const {created_at,slekret_user,content} =reply
  const { avatar_src, displayname, username } = slekret_user
  const [action, setAction] = useState(true);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-center relative">
        {replyLength && replyLength > 0 && (
          <div className="w-12 border-l-2 border-b-2 h-full absolute top-6 left-6 rounded-bl-lg" />
        )}

        <Link to={`/@${username}`} className="z-10 h-12">
          <div
            className="w-12 h-12 rounded-full bg-cover"
            style={{ backgroundImage: `url(${avatar_src})` }}
          />
        </Link>

        <div className="ml-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <p className="text-base font-bold tracking-normal text-gray-800">
                  {displayname}
                </p>
          
                  <span className="ml-2 rounded-full bg-green-200 text-green-800 font-medium text-xs px-3 py-1">
                    Best Answer
                  </span>
               
              </div>
              <p className="text-xs font-medium text-gray-400">
                {created_at}
              </p>
            </div>

            <div className="flex items-center select-none">
              <div
                className={`mr-2 p-1 border hover:bg-blue-300 ${
                  action === actionUpVoted
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600'
                }`}
                onClick={() => {
                  setAction(action === actionUpVoted ? '' : actionUpVoted);
                }}
              >
                <IconArrowNarrowUp className="w-5 h-5" />
              </div>
              <div
                className={`mr-2 p-1 border hover:bg-pink-300 ${
                  action === actionDownVoted
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600'
                }`}
                onClick={() => {
                  setAction(action === actionDownVoted ? '' : actionDownVoted);
                }}
              >
                <IconArrowNarrowDown className="w-5 h-5" />
              </div>

              <p className="px-4 py-1 rounded-sm text-sm bg-gray-200 text-gray-600 font-medium">
                {0} votes
              </p>
            </div>
          </div>

          <div className="py-3">
            <ReactMarkdown plugins={[remarkGfm]}>{content}</ReactMarkdown>
            <div className="mt-2"></div>
          </div>
        </div>
      </div>

      <div className="pl-16">
        {replies &&
          replies.slice(0, 2).map((reply, index) => {
            return (
              <Reply
                key={index}
                hasNext={index < replies.length - 1}
                reply={reply}
              />
            );
          })}

        {replies && replies.length > 2 && (
          <div className="group w-full hover:bg-gray-100 px-6 py-3 flex items-center select-none">
            <div className="flex flex-col space-y-1">
              <div className="rounded-full w-1 h-1 bg-gray-300 group-hover:bg-gray-600"></div>
              <div className="rounded-full w-1 h-1 bg-gray-300 group-hover:bg-gray-600"></div>
              <div className="rounded-full w-1 h-1 bg-gray-300 group-hover:bg-gray-600"></div>
            </div>

            <div className="ml-10 text-sm text-blue-400 group-hover:text-blue-500 group-hover:font-medium group-hover:tracking-wide transition-all">
              Show replies
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Answer;
