import formatDistance from 'date-fns/formatDistance';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

const UserProfile = ({
  username,
  avatar,
  display_name,
  published_date,
  is_following,
}) => {
  const [following, setFollowing] = useState(is_following);

  return (
    <div className="mt-4 flex items-center justify-between">
      <Link to={`/@${username}`}>
        <div className="flex items-center">
          <UserAvatar src={avatar} />

          <div className="ml-2">
            <p className="text-base font-bold tracking-normal text-gray-800">
              {display_name}
            </p>
            {published_date && (
              <p className="text-xs font-medium text-gray-400">
                {formatDistance(published_date, new Date(), {
                  addSuffix: true,
                })}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div
        className={`px-6 py-2 text-sm font-medium rounded cursor-pointer select-none ${
          following
            ? 'bg-gray-500 text-white hover:bg-gray-800'
            : 'border border-blue-600 text-blue-600 hover:bg-blue-200'
        }`}
        onClick={() => setFollowing(!following)}
      >
        {following ? 'Following' : 'Follow'}
      </div>
    </div>
  );
};

export default UserProfile;
