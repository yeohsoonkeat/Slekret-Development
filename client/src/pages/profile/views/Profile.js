import ProfileCard from '../components/profileCard';
import ProfileFollow from '../components/profileFollow';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { username } = useParams();
  const { loading, error, data } = useQuery(GET_USER_DETAIL, {
    variables: { username },
  });

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  const user = data.slekret_users[0];

  return (
    <ProfileCard user={user}>
      <ProfileFollow user={user} />
    </ProfileCard>
  );
}
const GET_USER_DETAIL = gql`
  query MyQuery($username: String) {
    slekret_users(where: { username: { _eq: $username } }) {
      avatar_src
      description
      displayname
      followers
      following
      username
      last_login
    }
  }
`;
