import { gql, useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import useAuthProvider from '../../../../hook/useAuthProvider';
import AnswerCard from './AnswerCard';

const AnswerEditor = ({ question_id }) => {
  const answerContentRef = useRef();
  const current_user_id = useAuthProvider()[0]?.user.id;

  const { loading: loadingTotalAnswers, data } = useQuery(FETCH_DATA, {
    variables: { question_id },
  });

  const [answerQuestion, { loading }] = useMutation(ANSWER_QUESTION, {
    onCompleted(data) {
      const {
        id,
        content,
        created_at: published_date,
        slekret_user,
      } = data.insert_forum_question_answers.returning[0];
      const {
        username,
        displayname: display_name,
        avatar_src: avatar,
      } = slekret_user;

      setAnswer({
        isAccepted: false,
        id,
        content,
        published_date,
        voteAction: 0,
        votes: 0,
        author: { username, display_name, avatar },
        replies: [],
      });
      setPosted(true);
      answerContentRef.current.value = '';
    },
  });

  const [posted, setPosted] = useState(false);
  const [answer, setAnswer] = useState({});

  if (loadingTotalAnswers) {
    return <div>Loading...</div>;
  }

  const total_answers = data.forum_question_answers_aggregate.aggregate.count;

  return (
    <div>
      <div className="mb-4 pb-4 border-b font-medium">
        {total_answers} Answer{total_answers > 1 && 's'}
      </div>
      <div className="mt-4 mb-6">
        <textarea
          ref={answerContentRef}
          className="w-full h-40 rounded-lg p-4 resize-none focus:outline-none"
          placeholder="Write your answer here..."
        />

        <div className="mt-2 flex justify-end items-center space-x-2">
          <button
            disabled={loading}
            className="px-6 py-2 rounded-md text-sm border bg-blue-600 text-white disabled:opacity-25"
            onClick={() => {
              const content = answerContentRef.current.value;
              answerQuestion({
                variables: {
                  content,
                  question_id,
                  current_user_id,
                },
                refetchQueries: [
                  { query: FETCH_DATA, variables: { question_id } },
                ],
              });
            }}
          >
            Answer
          </button>
        </div>

        {posted && (
          <div className="mt-6">
            <AnswerCard answer={answer} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerEditor;

const ANSWER_QUESTION = gql`
  mutation MyMutation(
    $content: String = ""
    $question_id: uuid = ""
    $current_user_id: uuid = ""
  ) {
    insert_forum_question_answers(
      objects: { content: $content, forum_question_id: $question_id }
    ) {
      returning {
        id
        content
        created_at
        forum_question_answer_votes(
          where: { user_id: { _eq: $current_user_id } }
        ) {
          vote
        }
        forum_question_answer_votes_aggregate {
          aggregate {
            sum {
              vote
            }
          }
        }
        slekret_user {
          avatar_src
          displayname
          username
        }
      }
    }
  }
`;

const FETCH_DATA = gql`
  query MyQuery($question_id: uuid = "") {
    forum_question_answers_aggregate(
      where: { forum_question_id: { _eq: $question_id } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
