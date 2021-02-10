import { gql, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import gfm from 'remark-gfm';
import useAuthProvider from '../../../hook/useAuthProvider';
import Answers from '../components/Answer/Answers';
import QuestionOwner from '../components/QuestionOwner';
import QuestionVote from '../components/QuestionVote';
import ReportButton from '../components/ReportButton';
import ErrorPage from './ErrorPage';
import QuestionDetailSkeleton from './QuestionDetailSkeleton';

const QuestionDetail = () => {
	const { id } = useParams();
	const current_user_id = useAuthProvider()[0]?.user.id;

	const { loading, error, data } = useQuery(GET_QUESTION_DETAIL, {
		variables: { id, current_user_id },
	});

	if (loading) {
		return <QuestionDetailSkeleton />;
	}

	if (error) {
		return <ErrorPage error={error} />;
	}

	const dbQuestion = data.forum_questions[0];
	const { title, content } = dbQuestion;

	return (
		<div>
			<p className="text-2xl font-bold text-gray-800">{title}</p>
			<QuestionOwner question_id={id} />
			<div className="py-4">
				<ReactMarkdown plugins={[gfm]}>{content}</ReactMarkdown>
			</div>
			<div className="flex justify-between">
				<QuestionVote question_id={id} />
				<ReportButton />
			</div>

			{/* Answers */}
			<div className="mt-12">
				<Answers question_id={id} />
			</div>
		</div>
	);
};

export default QuestionDetail;

const GET_QUESTION_DETAIL = gql`
	query MyQuery($id: uuid = "") {
		forum_questions(where: { id: { _eq: $id } }) {
			title
			content
		}
	}
`;
