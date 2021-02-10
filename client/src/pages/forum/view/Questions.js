import { gql, useQuery } from '@apollo/client';
import QuestionCard from '../components/QuestionCard';

const Questions = (props) => {
	const { match } = props;
	const current_url = match.url;

	const { loading, error, data } = useQuery(GET_FORUM_QUESTIONS);

	if (loading) {
		return <h1>Loading</h1>;
	}
	if (error) {
		return <h1>error</h1>;
	}

	const { forum_questions: questions } = data;
	if (questions && questions.length === 0) {
		return (
			<div className="w-full h-56 bg-gray-500 flex justify-center items-center text-white text-lg">
				No Questions Yet.
			</div>
		);
	}

	return (
		<div className="flex-1 max-w-full">
			{questions.map((item, index) => (
				<div key={index} className={`${index !== 0 && 'mt-8'}`}>
					<QuestionCard item={item} current_url={current_url} />
				</div>
			))}
		</div>
	);
};

const GET_FORUM_QUESTIONS = gql`
	query MyQuery {
		forum_questions {
			content
			created_at
			id
			title
			slekret_user {
				avatar_src
				displayname
				username
			}
			forum_tags {
				tag_name
			}
			forum_question_votes_aggregate {
				aggregate {
					sum {
						vote
					}
				}
			}
			forum_question_answers_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`;

export default Questions;
