import { gql, useQuery } from '@apollo/client';
import numeral from 'numeral';
import useAuthProvider from '../../../../hook/useAuthProvider';
import IconArrowNarrowDown from '../../../../icons/ic_arrow_narrow_down';
import IconArrowNarrowUp from '../../../../icons/ic_arrow_narrow_up';
import vote_action from '../../constant';

function AnswerVote({ answer_id }) {
  const current_user_id = useAuthProvider()[0]?.user.id;

  const { loading, data } = useQuery(FETCH_DATA, {
    variables: { answer_id, current_user_id },
  });

  if (loading) {
    return <div>Loading....</div>;
  }

  const votes = data.forum_question_answer_votes_aggregate.aggregate.sum.vote;
  const voteAction = data.forum_question_answer_votes[0]?.vote;

  return (
    <div className="flex items-center select-none">
      <div
        className={`mr-2 p-1 border hover:bg-blue-300 ${
          voteAction === vote_action.up
            ? 'bg-blue-500 text-white'
            : 'text-gray-600'
        }`}
      >
        <IconArrowNarrowUp className="w-5 h-5" />
      </div>
      <div
        className={`mr-2 p-1 border hover:bg-pink-300 ${
          voteAction === vote_action.down
            ? 'bg-pink-500 text-white'
            : 'text-gray-600'
        }`}
      >
        <IconArrowNarrowDown className="w-5 h-5" />
      </div>

      <p className="px-4 py-1 rounded-sm text-sm bg-gray-200 text-gray-600 font-medium">
        {numeral(votes).format('0.[00]a')} vote
        {votes > 1 && 's'}
      </p>
    </div>
  );
}

export default AnswerVote;

const FETCH_DATA = gql`
  query MyQuery($answer_id: uuid = "", $current_user_id: uuid = "") {
    forum_question_answer_votes_aggregate(
      where: { forum_question_answer_id: { _eq: $answer_id } }
    ) {
      aggregate {
        sum {
          vote
        }
      }
    }
    forum_question_answer_votes(
      where: {
        forum_question_answer_id: { _eq: $answer_id }
        user_id: { _eq: $current_user_id }
      }
    ) {
      vote
    }
  }
`;

// const INSERT_VOTE = gql``

// const UPDATE_VOTE = gql``
