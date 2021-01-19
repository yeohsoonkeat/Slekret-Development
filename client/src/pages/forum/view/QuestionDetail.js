import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import gfm from 'remark-gfm';
import MarkdownEditor from '../../../components/MarkdownEditor';
import IconArrowNarrowDown from '../../../icons/ic_arrow_narrow_down';
import IconArrowNarrowUp from '../../../icons/ic_arrow_narrow_up';
import IconInfo from '../../../icons/ic_info';
import Answer from '../components/Answer';
import UserAvatar from '../components/UserAvatar';
import formatDistance from 'date-fns/formatDistance';
import numeral from 'numeral';
import { FieldsOnCorrectTypeRule } from 'graphql';
import UserProfile from '../components/UserProfile';

const initial_question = {
  title: '',
  content: '',
  voteAction: 0, // can only be -1, 0 and 1
  votes: 0,
  published_date: new Date(),
  author: {
    username: '',
    display_name: 'Unknown',
    isFollowing: false,
    avatar: '',
  },
};
const initial_answer = {
  isAccepted: false,
  published_date: new Date(),
  voteAction: 0, // can only be -1, 0 and 1
  votes: 0,
  content: '',
  author: {
    username: '',
    display_name: 'Unknown',
    avatar: '',
  },
};
const initial_reply = {
  published_date: new Date(),
  reply_to_user: {
    username: '',
    display_name: '',
  },
  reply_to_id: '',
  content: '',
  author: {
    username: '',
    display_name: 'Unknown',
    avatar: '',
  },
};


const actionUpVoted = 1;
const actionDownVoted = -1;
const QuestionDetail = () => {
  const question = initial_question;
  const answers = [initial_answer];
  const replies = [initial_reply];

  const [questionVoteAction, setQuestionVoteAction] = useState(
    question.voteAction
  );

  return (
    <div>
      <p className="text-2xl font-bold text-gray-800">{question.title}</p>

      {/* User Info */}
      <UserProfile
        username={question.author.username}
        avatar={question.author.avatar}
        display_name={question.author.display_name}
        published_date={question.published_date}
        is_following={question.author.is_following}
      />

      <div className="py-4">
        <ReactMarkdown plugins={[gfm]}>{question.content}</ReactMarkdown>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center select-none">
          <div
            className={`mr-2 p-2 border hover:bg-blue-300 ${
              questionVoteAction === actionUpVoted
                ? 'bg-blue-500 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => {
              setQuestionVoteAction(
                questionVoteAction === actionUpVoted ? '' : actionUpVoted
              );
            }}
          >
            <IconArrowNarrowUp className="w-6 h-6" />
          </div>
          <div
            className={`mr-2 p-2 border hover:bg-pink-300 ${
              questionVoteAction === actionDownVoted
                ? 'bg-pink-500 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => {
              setQuestionVoteAction(
                questionVoteAction === actionDownVoted ? '' : actionDownVoted
              );
            }}
          >
            <IconArrowNarrowDown className="w-6 h-6" />
          </div>
          <span className="ml-2">
            {numeral(question.votes).format('0.[00]a')} vote
            {question.votes > 1 && 's'}
          </span>
        </div>

				<div className="flex items-center text-gray-600 hover:cursor-pointer hover:font-medium hover:text-gray-800">
					<IconInfo className="w-6 h-6" />
					<p className="ml-1 text-sm">Report</p>
				</div>
			</div>

      {/* Answers */}
      <div className="mt-4">
        <MarkdownEditor placeholder="Write your answer here..." />
        <div className="mt-2 flex justify-end">
          <button
            className="px-6 py-2 rounded-md text-sm border bg-blue-600 text-white"
            onClick={() => {
              console.log('answer');
            }}
          >
            Answer
          </button>
        </div>
      </div>
      <div className="mt-12 mb-4 pb-4 border-b font-medium">
        {answers.length} Answer{answers.length > 1 && 's'}
      </div>
      {answers && answers.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {answers.map((answer, index) => {
            return <Answer key={index} answer={answer} replies={replies} />;
          })}
        </div>
      ) : (
        <div className="w-full h-40 bg-gray-400 flex justify-center items-center text-white">
          No Answer Yet
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;

