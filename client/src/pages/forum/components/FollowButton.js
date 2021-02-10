import { gql, useMutation, useQuery } from '@apollo/client';

function FollowButton({ current_user_id, question_owner_id }) {
	const variables = {
		follower_id: current_user_id,
		following_id: question_owner_id,
	};

	const { loading, data } = useQuery(FETCH_DATA, { variables });
	const [follow, { loading: followLoading }] = useMutation(FOLLOW, {
		variables,
		refetchQueries: [{ query: FETCH_DATA, variables }],
	});
	const [unfollow, { loading: unfollowLoading }] = useMutation(UNFOLLOW, {
		variables,
		refetchQueries: [{ query: FETCH_DATA, variables }],
	});

	if (loading || followLoading || unfollowLoading) {
		return (
			<button
				className="w-36 h-10 flex items-center justify-center text-sm font-medium rounded select-none bg-gray-500 text-white hover:bg-gray-800"
				disabled={true}
			>
				<svg
					className="animate-spin w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</button>
		);
	}

	const isFollowing = data.slekret_user_followings.length > 0;
	return (
		<button
			className={`w-36 h-10 text-sm font-medium rounded cursor-pointer select-none ${
				isFollowing
					? 'bg-gray-500 text-white hover:bg-gray-800'
					: 'border border-blue-600 text-blue-600 hover:bg-blue-200'
			}`}
			disabled={followLoading || unfollowLoading}
			onClick={isFollowing ? unfollow : follow}
		>
			{isFollowing ? 'Following' : 'Follow'}
		</button>
	);
}

export default FollowButton;

const FETCH_DATA = gql`
	query MyQuery($follower_id: uuid = "", $following_id: uuid = "") {
		slekret_user_followings(
			where: {
				follower_user_id: { _eq: $follower_id }
				following_user_id: { _eq: $following_id }
			}
		) {
			id
		}
	}
`;

const FOLLOW = gql`
	mutation MyMutation($follower_id: uuid = "", $following_id: uuid = "") {
		insert_slekret_user_followings_one(
			object: {
				follower_user_id: $follower_id
				following_user_id: $following_id
			}
		) {
			id
		}
	}
`;

const UNFOLLOW = gql`
	mutation MyMutation($follower_id: uuid = "", $following_id: uuid = "") {
		delete_slekret_user_followings(
			where: {
				follower_user_id: { _eq: $follower_id }
				following_user_id: { _eq: $following_id }
			}
		) {
			returning {
				id
			}
		}
	}
`;
