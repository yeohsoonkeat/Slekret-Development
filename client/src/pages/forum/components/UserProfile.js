import { gql, useMutation } from '@apollo/client';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

const UserProfile = ({
  user_id,
  username,
  avatar,
  display_name,
  published_date,
  is_following,
}) => {
  const [followUser, { data, loading, error }] = useMutation(FOLLOW_USER, {
    variables: { user_id_two: user_id },
  });

  console.log(data);

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
      <div
        className={`px-6 py-2 text-sm font-medium rounded cursor-pointer select-none ${
          is_following
            ? 'bg-gray-500 text-white hover:bg-gray-800'
            : 'border border-blue-600 text-blue-600 hover:bg-blue-200'
        }`}
        onClick={followUser}
      >
        {is_following ? 'Following' : 'Follow'}
      </div>
    </div>
  );
};

export default UserProfile;

const FOLLOW_USER = gql`
  mutation MyMutation($user_id_two: uuid) {
    insert_slekret_user_followings_one(object: { user_id_two: $user_id_two }) {
      id
    }
  }
`;
