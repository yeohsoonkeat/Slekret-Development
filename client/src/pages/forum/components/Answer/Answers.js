import { gql, useQuery } from '@apollo/client';
import AnswerCard from './AnswerCard';
import AnswerEditor from './AnswerEditor';

function Answers({ question_id }) {
	const { loading, data } = useQuery(FETCH_DATA, {
		variables: { question_id },
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	const answers = data.forum_question_answers.map((answer) => {
		const {
			id,
			content,
			created_at: published_date,
			forum_question_answer_votes,
			forum_question_answer_votes_aggregate,
			slekret_user,
		} = answer;

		const {
			username,
			displayname: display_name,
			avatar_src: avatar,
		} = slekret_user;

		return {
			id,
			content,
			published_date,
			isAccepted: false,
			voteAction: forum_question_answer_votes[0]?.vote,
			votes: forum_question_answer_votes_aggregate.aggregate.sum.vote,
			author: { username, display_name, avatar },
		};
	});

	return (
		<div>
			<AnswerEditor question_id={question_id} />
			{answers && answers.length > 0 ? (
				<div className="flex flex-col space-y-6">
					{answers.map((answer, index) => {
						return <AnswerCard key={index} answer={answer} />;
					})}
				</div>
			) : (
				<div className="w-full h-40 bg-gray-400 flex justify-center items-center text-white">
					No Answer Yet
				</div>
			)}
		</div>
	);
}

export default Answers;

const FETCH_DATA = gql`
	query MyQuery($question_id: uuid = "") {
		forum_question_answers(
			where: { forum_question_id: { _eq: $question_id } }
			order_by: { created_at: asc }
		) {
			id
			content
			created_at
			slekret_user {
				avatar_src
				displayname
				username
			}
			forum_question_answer_votes {
				vote
			}
			forum_question_answer_votes_aggregate {
				aggregate {
					sum {
						vote
					}
				}
			}
		}
	}
`;
