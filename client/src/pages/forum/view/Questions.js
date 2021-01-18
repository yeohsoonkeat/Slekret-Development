import { Link } from 'react-router-dom';
import IconPlus from '../../../icons/ic_plus';
import QuestionCard from '../components/QuestionCard';
import { gql, useQuery } from '@apollo/client';

const Questions = (props) => {
  const { match } = props;
  const current_url = match.url;

  const { loading, error, data } = useQuery(GET_FORUM_QUESTION);
  
  if (loading) {

    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
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

const GET_FORUM_QUESTION = gql`
query m {
  forum_questions(order_by: {created_at: desc}) {
    id
    title
    content
    created_at
    forum_tags {
      tag {
        tag_name
      }
    }
    slekret_user {
      username
      displayname
      avatar_src
    }
    forum_replies_aggregate {
      aggregate {
        count
      }
    }
    forum_question_votes_aggregate {
      aggregate {
        count
      }
    }
  }
}
`;


export default Questions;


