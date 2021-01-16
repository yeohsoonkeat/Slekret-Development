import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import gfm from 'remark-gfm';
import MarkdownEditor from '../../../components/MarkdownEditor';
import IconArrowNarrowDown from '../../../icons/ic_arrow_narrow_down';
import IconArrowNarrowUp from '../../../icons/ic_arrow_narrow_up';
import IconInfo from '../../../icons/ic_info';
import Answer from '../components/Answer';
import AnswerEditor from '../components/AnswerEditor';

const actionUpVoted = 'up_voted';
const actionDownVoted = 'down_voted';

const QuestionDetail = (props) => {
  const title = 'Best way to export data in xml and csv format';
  const avatar =
    'https://images.unsplash.com/photo-1610294381328-9bcf7764010f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
  const display_name = 'Hunter Rodgers';
  const username = 'hunter_rodgers';
  const publish_date = '4 days ago';
  const question_description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolor ducimus est labore placeat repudiandae, minima alias, voluptates aliquam consequatur laudantium tempora hic doloribus nesciunt harum ipsam corrupti quasi ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolor ducimus est labore placeat repudiandae, minima alias, voluptates aliquam consequatur laudantium tempora hic doloribus nesciunt harum ipsam corrupti quasi ipsum.';
  const question_vote_action = 'hello';
  const question_votes = 4;
  const answers = [
    {
      votes: '200',
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
      votes: '1k',
      avatar:
        'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      display_name: 'John Doe',
      username: 'john_doe',
      publish_date: 'a day ago',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
    },
    {
      votes: '5.3k',
      avatar:
        'https://images.unsplash.com/photo-1608833970687-99bc4f54898d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      display_name: 'John Doe',
      username: 'john_doe',
      publish_date: 'a day ago',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eligendi rerum magni id aut modi quaerat dolore asperiores laudantium soluta distinctio quia quos sapiente officiis, cumque repudiandae repellat. Distinctio, blanditiis? Ipsa maiores assumenda laudantium perferendis ducimus, officia fugit! Dolores porro animi ad deleniti, libero dicta vero, excepturi sint veniam assumenda saepe doloremque eligendi culpa, at beatae quis perferendis commodi ut. Culpa porro a est consequatur dolorum explicabo assumenda consequuntur mollitia animi. Error quaerat esse perferendis eveniet sed, illum, at consequatur tenetur maxime, nobis ex dolor laborum id? Ipsa, aliquam placeat.',
    },
  ];

  const [questionVoteAction, setQuestionVoteAction] = useState(
    question_vote_action
  );
  const [questionVotes, setQuestionVotes] = useState(question_votes);

  const followed = true;
  const [following, setFollowing] = useState(followed);

  return (
    <div>
      <p className="text-2xl font-bold text-gray-800">{title}</p>

      {/* User Info */}
      <div className="mt-4 flex items-center justify-between">
        <Link to={`/@${username}`}>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-full bg-cover"
              style={{ backgroundImage: `url(${avatar})` }}
            />

            <div className="ml-2">
              <p className="text-base font-bold tracking-normal text-gray-800">
                {display_name}
              </p>
              <p className="text-xs font-medium text-gray-400">
                {publish_date}
              </p>
            </div>
          </div>
        </Link>
        <div
          className={`px-6 py-2 text-white text-sm font-medium rounded cursor-pointer select-none ${
            following ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-500'
          }`}
          onClick={() => setFollowing(!following)}
        >
          {following ? 'Following' : 'Follow'}
        </div>
      </div>

      <div className="py-4">
        <ReactMarkdown plugins={[gfm]}>{question_description}</ReactMarkdown>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center select-none">
          <div
            className={`mr-2 p-2 border hover:bg-blue-300 ${
              questionVoteAction === actionUpVoted
                ? 'bg-blue-500 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => {
              setQuestionVoteAction(
                questionVoteAction === actionUpVoted ? '' : actionUpVoted
              );
            }}
          >
            <IconArrowNarrowUp className="w-6 h-6" />
          </div>
          <div
            className={`mr-2 p-2 border hover:bg-pink-300 ${
              questionVoteAction === actionDownVoted
                ? 'bg-pink-500 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => {
              setQuestionVoteAction(
                questionVoteAction === actionDownVoted ? '' : actionDownVoted
              );
            }}
          >
            <IconArrowNarrowDown className="w-6 h-6" />
          </div>
          <span className="ml-2">{questionVotes} votes</span>
        </div>

        <div className="flex items-center text-gray-600 hover:cursor-pointer hover:font-medium hover:text-gray-800">
          <IconInfo className="w-6 h-6" />
          <p className="ml-1 text-sm">Report</p>
        </div>
      </div>

      {/* Answers */}
      <div className="mt-4">
        {/* <AnswerEditor /> */}
        <MarkdownEditor placeholder="Write your answer here..." />
      </div>
      <div className="mt-12 mb-4 pb-4 border-b font-medium">
        {answers.length} Answers
      </div>
      <div className="flex flex-col space-y-6">
        {answers.map((answer, index) => (
          <Answer key={index} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default QuestionDetail;
