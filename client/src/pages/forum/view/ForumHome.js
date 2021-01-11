import { useState } from 'react';
import IconAnnotation from '../../../icons/ic_annotation';
import IconGlobe from '../../../icons/ic_globe';
import IconHome from '../../../icons/ic_home';
import IconPlus from '../../../icons/ic_plus';
import IconQuestion from '../../../icons/ic_question';
import IconButton from '../components/IconButton';
import ItemCard from '../components/ItemCard';

const items = [
  {
    title: 'What does the fox say?',
    tags: ['General', 'Animal', 'Sound'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam noncorrupti itaque nesciunt. Suscipit omnis perferendis earum excepturi officiis nisi consectetur, ad aliquid ducimus laudantium natus necessitatibus veritatis ratione et. Quaerat eum rem voluptates similique recusandae atque, tenetur aspernatur fuga? Vel, illo delectus sapiente expedita iste reiciendis asperiores. Nemo nobis reprehenderit numquam porro, vel voluptatum? Sunt fugiat laborum officiis ipsum. Provident nesciunt earum quidem minus voluptatum laudantium consequuntur incidunt enim ipsam necessitatibus cum maiores officiis repellat officia expedita corrupti dignissimos, tenetur reiciendis dicta! Nulla mollitia veritatis animi similique quod provident?',
    avatar:
      'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    username: 'Askash  Raj Dahal',
    profile_url: 'https://www.google.com/',
    posted_date: '12hour ago',
    comments: '1k',
  },
  {
    previousAction: 'liked', // ['liked', 'disliked']
    votes: 200,
    title: 'What do you like to do when you visit a new town or city?',
    tags: ['Travel', 'City', 'Interest', 'Culture'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ratione veritatis nobis quam voluptates, aspernatur iure tempore ducimus natus vitae. A quae ipsa dolor explicabo error, voluptatum officiis fugiat praesentium.',
    avatar:
      'https://images.unsplash.com/photo-1610358808300-29911abdd0d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    username: 'John Doe',
    profile_url: 'https://www.google.com/',
    posted_date: 'a day ago',
    comments: '200k',
  },
];

const ForumHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex-1 px-6 flex my-8">
      <ul className="w-48 divide-y hidden lg:block">
        {[
          { title: 'Home', icon: IconHome },
          { title: 'Explore Topics', icon: IconGlobe },
          { title: 'My Questions', icon: IconQuestion },
          { title: 'My Answers', icon: IconAnnotation },
        ].map((category, index) => {
          return (
            <IconButton
              key={index}
              title={category.title}
              icon={category.icon}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </ul>

      <div className="flex-1">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md flex items-center">
            <IconPlus className="w-5 h-5" />
            <span className="ml-1 font-medium">Ask Question</span>
          </button>
        </div>
        {items.map((item, index) => (
          <div key={index} className={`${index !== 0 && 'mt-8'}`}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumHome;
