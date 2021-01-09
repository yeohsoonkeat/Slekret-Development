import React from 'react';

export default function ProfileFollow(props) {
	return (
        <div>
            <div className="py-10 px-6 text-center tracking-wide grid grid-cols-3 gap-6">
                <div className="posts">
                    <p className="text-lg font-semibold text-blue-300">{props.user.posts}</p>
                    <p className="text-gray-500 text-md">Posts</p>
                </div>
                <div className="followers">
                    <p className="text-lg font-semibold text-blue-300">{props.user.follower}</p>
                    <p className="text-gray-500 text-md">Followers</p>
                </div>
                <div className="following">
                    <p className="text-lg font-semibold text-blue-300">{props.user.following}</p>
                    <p className="text-gray-500 text-md">Following</p>
                </div>
            </div>
        </div>
	);
}
