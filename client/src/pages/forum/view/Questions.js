import { Link } from 'react-router-dom';
import IconPlus from '../../../icons/ic_plus';
import QuestionCard from '../components/QuestionCard';
import { gql, useQuery } from '@apollo/client';
import useAuthProvider from '../../../hook/useAuthProvider';

const Questions = (props) => {
  const { match } = props;
  const current_url = match.url;
  const [authState] = useAuthProvider();
  const { loading, error, data } = useQuery(GET_ALL_QUESTIONS, {
    variables: { user_id: authState.user.id },
  });
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  return (
    <div className="flex-1 max-w-full">
      <div className="flex justify-end mb-4">
        <Link
          to={`${current_url}/new-question`}
          className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md flex items-center"
        >
          <IconPlus className="w-5 h-5" />
          <span className="ml-1 font-medium">Ask Question</span>
        </Link>
      </div>
      {data.forum_questions.map((item, index) => (
        <div key={index} className={`${index !== 0 && 'mt-8'}`}>
          <QuestionCard item={item} current_url={current_url} />
        </div>
      ))}
    </div>
  );
};

export default Questions;

const GET_ALL_QUESTIONS = gql`
  query MyQuery($user_id: uuid) {
    forum_questions {
      content
      title
      slekret_user {
        avatar_src
        displayname
        id
      }
      id
      forum_tags {
        tag {
          tag_name
        }
      }
      forum_upvote_downvotes(
        where: { slekret_user: { id: { _eq: $user_id } } }
      ) {
        vote
      }
      forum_upvote_downvotes_aggregate {
        aggregate {
          sum {
            vote
          }
        }
      }
      forum_replies_aggregate(where: { reply_to: { _is_null: true } }) {
        aggregate {
          count
        }
      }
    }
  }
`;
