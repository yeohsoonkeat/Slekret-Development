import React, { useState } from 'react';
import IconArrowNarrowDown from '../../../icons/ic_arrow_narrow_down';
import IconArrowNarrowUp from '../../../icons/ic_arrow_narrow_up';
import numeral from 'numeral';

const actionUpVoted = 1;
const actionDownVoted = -1;
const VoteAction = ({ previousAction, votes }) => {
  const [questionVoteAction, setQuestionVoteAction] = useState(
    previousAction,
    votes
  );

  return (
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
        {numeral(votes).format('0.[00]a')} vote
        {votes > 1 && 's'}
      </span>
    </div>
  );
};

export default VoteAction;
