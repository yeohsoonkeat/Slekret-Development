import Features from '../components/features';
import Home from '../components/hero';
import { gql, useQuery } from '@apollo/client';

export default function HomePage() {
	const { loading, error, data } = useQuery(GET_ALL_USERS);

	if (loading) {
		return <h1>Loading</h1>;
	}
	if (error) {
		return <h1>erorr</h1>;
	}
	console.log(data, 'testing');

	return (
		<div>
			<Home />
			<hr />
			<Features />
		</div>
	);
}

const GET_ALL_USERS = gql`
	query MyQuery {
		slekret_users {
			avatar_src
			description
			displayname
			followers
			following
			username
		}
	}
`;
