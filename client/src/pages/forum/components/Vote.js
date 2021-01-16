import { useState } from 'react';
import IconThumbDown from '../../../icons/ic_thumb_down';
import IconThumbUp from '../../../icons/ic_thumb_up';

const actionLiked = 'liked';
const actionDisliked = 'disliked';

const Vote = ({ votes, previousAction }) => {
  const [currentVotes, setCurrentVotes] = useState(votes || 0);
  const [action, setAction] = useState(previousAction);

  return (
    <div className="p-6 flex flex-col items-center">
      <div
        onClick={() => {
          if (action !== actionLiked) {
            setAction(actionLiked);
            setCurrentVotes(currentVotes + 1);
          }
        }}
      >
        <IconThumbUp
          className={`w-6 h-6 ${action === actionLiked && 'text-blue-600'}`}
          filled={action === actionLiked}
        />
      </div>

      <span
        className={`select-none ${action && 'font-bold'} ${
          action === actionLiked && 'text-blue-600'
        } ${action === actionDisliked && 'text-red-600'}`}
      >
        {currentVotes}
      </span>

      <div
        onClick={() => {
          if (action !== actionDisliked) {
            setAction(actionDisliked);
            setCurrentVotes(currentVotes - 1);
          }
        }}
      >
        <IconThumbDown
          className={`w-6 h-6 ${action === actionDisliked && 'text-red-600'}`}
          filled={action === actionDisliked}
        />
      </div>
    </div>
  );
};

export default Vote;
