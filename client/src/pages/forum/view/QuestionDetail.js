import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import gfm from 'remark-gfm';
import IconHeart from '../../../icons/ic_heart';
import IconInfo from '../../../icons/ic_info';
import Answer from '../components/Answer';

const QuestionDetail = (props) => {
  const title = 'Best way to export data in xml and csv format';
  const avatar =
    'https://images.unsplash.com/photo-1610294381328-9bcf7764010f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
  const display_name = 'Hunter Rodgers';
  const username = 'hunter_rodgers';
  const publish_date = '4 days ago';
  const question_description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolor ducimus est labore placeat repudiandae, minima alias, voluptates aliquam consequatur laudantium tempora hic doloribus nesciunt harum ipsam corrupti quasi ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolor ducimus est labore placeat repudiandae, minima alias, voluptates aliquam consequatur laudantium tempora hic doloribus nesciunt harum ipsam corrupti quasi ipsum.';
  const liked = true;
  const numberOfLikes = 4;
  const answers = [
    {
      avatar:
        'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      display_name: 'John Doe',
      username: 'john_doe',
      publish_date: 'a day ago',
      best_answer: true,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
      replies: [
        {
          avatar:
            'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          display_name: 'John Doe',
          username: 'john_doe',
          publish_date: 'a day ago',
          best_answer: true,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
        },
        {
          avatar:
            'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          display_name: 'John Doe',
          username: 'john_doe',
          publish_date: 'a day ago',
          best_answer: true,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
        },
        {
          avatar:
            'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          display_name: 'John Doe',
          username: 'john_doe',
          publish_date: 'a day ago',
          best_answer: true,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
        },
        {
          avatar:
            'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          display_name: 'John Doe',
          username: 'john_doe',
          publish_date: 'a day ago',
          best_answer: true,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
        },
      ],
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      display_name: 'John Doe',
      username: 'john_doe',
      publish_date: 'a day ago',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      display_name: 'John Doe',
      username: 'john_doe',
      publish_date: 'a day ago',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
    },
  ];

  const [isLiked, setIsLiked] = useState(liked);
  const [likes, setLikes] = useState(numberOfLikes);

  return (
    <div className="">
      <p className="text-2xl font-bold text-gray-800">{title}</p>

      {/* User Info */}
      <Link to={`/@${username}`}>
        <div className="flex items-center mt-4">
          <div
            className="w-12 h-12 rounded-full bg-cover"
            style={{ backgroundImage: `url(${avatar})` }}
          />

          <div className="ml-2">
            <p className="text-base font-bold tracking-normal text-gray-800">
              {display_name}
            </p>
            <p className="text-xs font-medium text-gray-400">{publish_date}</p>
          </div>
        </div>
      </Link>

      <div className="py-4">
        <ReactMarkdown plugins={[gfm]}>{question_description}</ReactMarkdown>
      </div>

      <div className="flex justify-between">
        <div
          className={`flex items-center hover:cursor-pointer transition-color duration-1000 ${
            isLiked ? 'text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => {
            setIsLiked(!isLiked);

            if (isLiked) {
              setLikes(likes - 1);
            } else {
              setLikes(likes + 1);
            }
          }}
        >
          <IconHeart className="w-8 h-8" filled={isLiked} />
          <p className="text-sm font-medium">{likes} likes</p>
        </div>

        <div className="flex items-center text-gray-600 hover:cursor-pointer hover:font-medium hover:text-gray-800">
          <IconInfo className="w-6 h-6" />
          <p className="ml-1 text-sm">Report</p>
        </div>
      </div>

      <div className="mt-12 mb-4 pb-4 border-b font-medium">
        {answers.length} Answers
      </div>

      <div className="flex flex-col space-y-6">
        {answers
          .concat(answers)
          .concat(answers)
          .map((answer, index) => (
            <Answer key={index} answer={answer} />
          ))}
      </div>
    </div>
  );
};

export default QuestionDetail;
