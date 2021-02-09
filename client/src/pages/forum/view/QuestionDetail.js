import { gql, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import gfm from 'remark-gfm';
import useAuthProvider from '../../../hook/useAuthProvider';
import Answers from '../components/Answer/Answers';
import QuestionOwner from '../components/QuestionOwner';
import QuestionVote from '../components/QuestionVote';
import ReportButton from '../components/ReportButton';
import ErrorPage from './ErrorPage';
import QuestionDetailSkeleton from './QuestionDetailSkeleton';

const QuestionDetail = () => {
  const { id } = useParams();
  const current_user_id = useAuthProvider()[0]?.user.id;

  const { loading, error, data } = useQuery(GET_QUESTION_DETAIL, {
    variables: { id, current_user_id },
  });

  if (loading) {
    return <QuestionDetailSkeleton />;
  }

  if (error) {
    return <ErrorPage error={error} />;
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
    voteAction: current_user_question_vote_action[0]?.vote,
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
      {question.author && <QuestionOwner question_id={id} />}
      <div className="py-4">
        <ReactMarkdown plugins={[gfm]}>{question.content}</ReactMarkdown>
      </div>
      <div className="flex justify-between">
        <QuestionVote question_id={id} />
        <ReportButton />
      </div>

      {/* Answers */}
      <div className="mt-12">
        <Answers question_id={id} />
      </div>
    </div>
  );
};

export default QuestionDetail;

const GET_QUESTION_DETAIL = gql`
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
