import IconPlus from '../../../icons/ic_plus';
import QuestionCard from '../components/QuestionCard';
import { gql, useQuery } from '@apollo/client';

const items = [
  {
    id: 1,
    title: 'What does the fox say?',
    tags: ['General', 'Animal', 'Sound'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam noncorrupti itaque nesciunt. Suscipit omnis perferendis earum excepturi officiis nisi consectetur, ad aliquid ducimus laudantium natus necessitatibus veritatis ratione et. Quaerat eum rem voluptates similique recusandae atque, tenetur aspernatur fuga? Vel, illo delectus sapiente expedita iste reiciendis asperiores. Nemo nobis reprehenderit numquam porro, vel voluptatum? Sunt fugiat laborum officiis ipsum. Provident nesciunt earum quidem minus voluptatum laudantium consequuntur incidunt enim ipsam necessitatibus cum maiores officiis repellat officia expedita corrupti dignissimos, tenetur reiciendis dicta! Nulla mollitia veritatis animi similique quod provident?',
    avatar:
      'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    display_name: 'Askash  Raj Dahal',
    username: 'askash_raj_dahal',
    profile_url: 'https://www.google.com/',
    posted_date: '12hour ago',
    comments: '1k',
  },
  {
    id: 2,
    previousAction: 'liked', // ['liked', 'disliked']
    votes: 200,
    title: 'What do you like to do when you visit a new town or city?',
    tags: ['Travel', 'City', 'Interest', 'Culture'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ratione veritatis nobis quam voluptates, aspernatur iure tempore ducimus natus vitae. A quae ipsa dolor explicabo error, voluptatum officiis fugiat praesentium.',
    avatar:
      'https://images.unsplash.com/photo-1610358808300-29911abdd0d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    display_name: 'John Doe',
    username: 'john_doe',
    posted_date: 'a day ago',
    comments: '200k',
  },
];

const Questions = (props) => {
  const { match } = props;
  const current_url = match.url;
  const { loading, error, data } = useQuery(GET_FORUMS_AND_TAGS);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  console.log(data);
  return (
    <div className="flex-1 max-w-full">
      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md flex items-center">
          <IconPlus className="w-5 h-5" />
          <span className="ml-1 font-medium">Ask Question</span>
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className={`${index !== 0 && 'mt-8'}`}>
          <QuestionCard item={item} current_url={current_url} />
        </div>
      ))}
    </div>
  );
};

const GET_FORUMS_AND_TAGS = gql`
  query MyQuery {
    forum_questions {
      content
      forum_tags {
        tag {
          tag_name
        }
      }
    }
  }
`;

export default Questions;
