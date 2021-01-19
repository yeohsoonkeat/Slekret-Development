import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkdownEditor from '../../../components/MarkdownEditor';
import IconInfo from '../../../icons/ic_info';
import Answer from '../components/Answer';
import UserProfile from '../components/UserProfile';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import useAuthProvider from '../../../hook/useAuthProvider';
import VoteAction from '../components/VoteAction';

const QuestionDetail = () => {
  const { id } = useParams();
  const authState = useAuthProvider()[0];

  const { loading, error, data } = useQuery(GET_ALL_FORUM_QUESTIONS, {
    variables: {
      id,
      current_user_id: authState.user.id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error.</div>;
  }

  const dbQuestion = data.forum_questions[0];
  const {
    title,
    content,
    created_at: published_date,
    forum_question_votes: current_user_question_vote_action,
    forum_question_votes_aggregate: question_votes,
    slekret_user,
    forum_question_answers_aggregate: total_answers,
    forum_question_answers: question_answers,
  } = dbQuestion;
  const {
    id: user_id,
    username,
    displayname: display_name,
    avatar_src: avatar,
    slekretUserFollowingsByUserIdTwo: followings,
  } = slekret_user;

  const question = {
    title,
    content,
    published_date,
    voteAction: current_user_question_vote_action[0]?.vote || 0,
    votes: question_votes.aggregate.sum.vote,
    author: {
      id: user_id,
      username,
      display_name,
      avatar,
      is_following: followings.length > 0,
    },
  };

  // Answers
  const answers = question_answers.map((answer) => {
    const {
      content,
      created_at: published_date,
      forum_question_answer_votes_aggregate: answer_votes,
      forum_question_answer_votes: current_user_answer_vote_action,
      slekret_user,
      forum_answer_replies: answer_replies,
    } = answer;
    const {
      username,
      displayname: display_name,
      avatar_src: avatar,
    } = slekret_user;

    // Replies
    const replies = answer_replies.map((reply) => {
      const {
        content,
        created_at: published_date,
        slekret_user,
        slekretUserByReplyingToUserId: origin,
      } = reply;
      const {
        username,
        displayname: display_name,
        avatar_src: avatar,
      } = slekret_user;

      return {
        content,
        published_date,
        author: { username, display_name, avatar },
        reply_to_user: origin
          ? {
              username: origin.username,
              display_name: origin.displayname,
              avatar: origin.avatar,
            }
          : null,
        reply_to_id: '',
      };
    });

    return {
      isAccepted: false,
      content,
      published_date,
      voteAction: current_user_answer_vote_action[0]?.vote,
      votes: answer_votes.aggregate.sum.vote,
      author: { username, display_name, avatar },
      replies,
    };
  });

  return (
    <div>
      <p className="text-2xl font-bold text-gray-800">{question.title}</p>

      {/* User Info */}
      {question.author && (
        <UserProfile
          user_id={question.author.id}
          username={question.author.username}
          avatar={question.author.avatar}
          display_name={question.author.display_name}
          published_date={question.published_date}
          is_following={question.author.is_following}
        />
      )}

      <div className="py-4">
        <ReactMarkdown plugins={[gfm]}>{question.content}</ReactMarkdown>
      </div>

      <div className="flex justify-between">
        <VoteAction
          previousAction={question.voteAction}
          votes={question.votes}
        />

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
        {total_answers.aggregate.count} Answer
        {total_answers.aggregate.count > 1 && 's'}
      </div>
      {answers && answers.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {answers.map((answer, index) => {
            return <Answer key={index} answer={answer} />;
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

const GET_ALL_FORUM_QUESTIONS = gql`
  query MyQuery($current_user_id: uuid = "", $id: uuid = "") {
    forum_questions(where: { id: { _eq: $id } }) {
      content
      created_at
      title
      slekret_user {
        id
        avatar_src
        displayname
        username
        slekretUserFollowingsByUserIdTwo(
          where: { user_id_one: { _eq: $current_user_id } }
        ) {
          id
        }
      }
      forum_question_votes_aggregate {
        aggregate {
          sum {
            vote
          }
        }
      }
      forum_question_votes(where: { user_id: { _eq: $current_user_id } }) {
        vote
      }
      forum_question_answers_aggregate {
        aggregate {
          count
        }
      }
      forum_question_answers {
        content
        created_at
        slekret_user {
          username
          displayname
          avatar_src
        }
        forum_question_answer_votes_aggregate {
          aggregate {
            sum {
              vote
            }
          }
        }
        forum_question_answer_votes(
          where: { user_id: { _eq: $current_user_id } }
        ) {
          vote
        }
        forum_answer_replies_aggregate {
          aggregate {
            count
          }
        }
        forum_answer_replies(order_by: { created_at: asc }) {
          content
          created_at
          slekret_user {
            username
            displayname
            avatar_src
          }
          slekretUserByReplyingToUserId {
            displayname
            username
            avatar_src
          }
        }
      }
    }
  }
`;
