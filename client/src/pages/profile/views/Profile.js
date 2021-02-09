import ProfileUserInfo from '../components/ProfileUserInfo';
import ProfileUserActivity from '../components/ProfileUserActivity';

export default function Profile({ match }) {
	const { username } = match.params;

	return (
		<div className="max-w-5xl  mx-auto mt-10 p-5">
			<ProfileUserInfo username={username} />
			<ProfileUserActivity username={username} />
		</div>
	);
}
