import { gql, useQuery } from '@apollo/client';

export default function ProfileUserInfo({ username }) {
	const { data, loading, error } = useQuery(GET_USER_INFO, {
		variables: {
			username,
		},
	});

	if (loading) {
		return <h1>Loading</h1>;
	}
	if (error) {
		return <h1>Error</h1>;
	}

	const user = data.slekret_users[0];

	return (
		<div>
			<div className="flex justify-between flex-col md:flex-row">
				<div>
					<div className="flex items-center">
						<img
							src={user.avatar_src}
							alt=""
							className="w-16 h-16 md:w-32 md:h-32 object-center object-cover rounded-full ring-4"
						/>
						<div className="ml-5 ">
							<div>
								<h1 className="text-2xl font-semibold">{user.displayname}</h1>
								<p className="text-gray-500">@{user.username}</p>
							</div>
							<div className="flex mt-5">
								<p className="font-semibold">
									0
									<span className=" font-normal ml-2 text-gray-500">
										Followers
									</span>
								</p>
								<p className="ml-5 font-semibold">
									0
									<span className="font-normal  ml-2 text-gray-500">
										Following
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* <button className="text-cente border w-full mt-5 rounded hover:tracking-wide md:w-40 h-10 hover:shadow transition-all focus:outline-none">
            Edit profile
        </button> */}
			</div>
			<p className="mt-5 md:mt-10">{user.about}</p>
		</div>
	);
}

const GET_USER_INFO = gql`
	query MyQuery($username: String) {
		slekret_users(where: { username: { _eq: $username } }) {
			avatar_src
			about
			displayname
			username
		}
	}
`;
