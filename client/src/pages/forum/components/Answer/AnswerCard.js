import formatDistance from 'date-fns/formatDistance';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import MarkdownEditor from '../../../../components/MarkdownEditor';
import IconReply from '../../../../icons/ic_reply';
import Reply from '../Reply';
import UserAvatar from '../UserAvatar';
import AnswerVote from './AnswerVote';

const AnswerCard = ({ answer }) => {
  const { author = {}, replies = [] } = answer;

  const [showReplyEditor, setShowReplyEditor] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex relative">
        {replies.length > 0 && (
          <div className="w-12 border-l-2 border-b-2 h-full absolute top-6 left-6 rounded-bl-lg" />
        )}

        <Link to={`/@${author.username}`} className="z-10 h-12">
          <UserAvatar src={author.avatar} />
        </Link>

        <div className="ml-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="flex items-center">
                <Link to={`/@${author.username}`}>
                  <p className="text-base font-bold tracking-normal text-gray-800">
                    {author.display_name}
                  </p>
                </Link>

                {answer.isAccepted && (
                  <span className="ml-2 rounded-full bg-green-200 text-green-800 font-medium text-xs px-3 py-1">
                    Best Answer
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-gray-400">
                {formatDistance(new Date(answer.published_date), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>

            <AnswerVote answer_id={answer.id} />
          </div>

          <div className="py-3">
            <ReactMarkdown plugins={[remarkGfm]}>
              {answer.content}
            </ReactMarkdown>
            <div className="mt-2">
              {!showReplyEditor ? (
                <div className="flex items-center hover:cursor-pointer">
                  <IconReply className="w-5 h-5" />
                  <span
                    className="ml-1 font-medium"
                    onClick={() => {
                      setShowReplyEditor(true);
                    }}
                  >
                    Reply
                  </span>
                </div>
              ) : (
                <div>
                  <div className="border">
                    <MarkdownEditor placeholder="Write down your reply here..." />
                  </div>
                  <div className="mt-2 flex justify-end items-center space-x-2">
                    <button
                      className="px-4 py-2 rounded-md text-sm"
                      onClick={() => {
                        setShowReplyEditor(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md text-sm border bg-blue-600 text-white"
                      onClick={() => {
                        setShowReplyEditor(false);
                      }}
                    >
                      Answer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pl-16">
        {replies.slice(0, 2).map((reply, index) => {
          return (
            <Reply
              key={index}
              hasNext={index < replies.length - 1}
              reply={reply}
            />
          );
        })}

        {replies.length > 2 && (
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

export default AnswerCard;