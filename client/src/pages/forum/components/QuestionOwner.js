import { gql, useQuery } from '@apollo/client';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import useAuthProvider from '../../../hook/useAuthProvider';
import FollowButton from './FollowButton';
import SkeletonQuestionOwner from './SkeletonQuestionOwner';
import UserAvatar from './UserAvatar';

const QuestionOwner = ({ question_id }) => {
  const current_user_id = useAuthProvider()[0].user.id;
  const { loading, data } = useQuery(GET_QUESTION_OWNER_DETAIL, {
    variables: { id: question_id },
  });
  const { created_at: published_date, slekret_user } = data.forum_questions[0];
  const {
    id: question_owner_id,
    avatar_src: avatar,
    displayname: display_name,
    username,
  } = slekret_user;

  if (loading) return <SkeletonQuestionOwner />;

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center select-none">
        <Link to={`/@${username}`}>
          <UserAvatar src={avatar} />
        </Link>

        <div className="ml-2">
          <Link to={`/@${username}`}>
            <p className="text-base font-bold tracking-normal text-gray-800">
              {display_name}
            </p>
          </Link>
          {published_date && (
            <p className="text-xs font-medium text-gray-400">
              {formatDistance(new Date(published_date), new Date(), {
                addSuffix: true,
              })}
            </p>
          )}
        </div>
      </div>
      <FollowButton
        current_user_id={current_user_id}
        question_owner_id={question_owner_id}
      />
    </div>
  );
};

export default QuestionOwner;

const GET_QUESTION_OWNER_DETAIL = gql`
  query MyQuery($id: uuid = "") {
    forum_questions(where: { id: { _eq: $id } }) {
      created_at
      slekret_user {
        id
        avatar_src
        displayname
        username
      }
    }
  }
`;
