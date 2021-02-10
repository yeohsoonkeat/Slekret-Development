import { gql, useMutation, useQuery } from '@apollo/client';
import numeral from 'numeral';
import useAuthProvider from '../../../hook/useAuthProvider';
import IconArrowNarrowDown from '../../../icons/ic_arrow_narrow_down';
import IconArrowNarrowUp from '../../../icons/ic_arrow_narrow_up';
import vote_action from '../constant';

const QuestionVote = ({ question_id }) => {
	const current_user_id = useAuthProvider()[0]?.user.id;

	const { loading, data } = useQuery(FETCH_DATA, {
		variables: { question_id, current_user_id },
	});

	const [insertVote, { loading: insertLoading }] = useMutation(INSERT_VOTE);
	const [updateVote, { loading: updateLoading }] = useMutation(UPDATE_VOTE);

	if (loading) return null;

	const votes = data.forum_question_votes_aggregate.aggregate.sum.vote;
	const voteAction = data.forum_question_votes[0]?.vote;

	return (
		<div className="flex items-center select-none">
			<button
				disabled={loading || insertLoading || updateLoading}
				className={`mr-2 p-2 border hover:bg-blue-300 ${
					voteAction === vote_action.up
						? 'bg-blue-500 text-white'
						: 'text-gray-600'
				}`}
				onClick={() => {
					if (voteAction === undefined) {
						insertVote({
							variables: { vote: vote_action.up, id: question_id },
							refetchQueries: [
								{
									query: FETCH_DATA,
									variables: { question_id, current_user_id },
								},
							],
						});
					} else {
						updateVote({
							variables: {
								vote:
									voteAction === vote_action.up
										? vote_action.none
										: vote_action.up,
								id: question_id,
								current_user_id,
							},
							refetchQueries: [
								{
									query: FETCH_DATA,
									variables: { question_id, current_user_id },
								},
							],
						});
					}
				}}
			>
				<IconArrowNarrowUp className="w-6 h-6" />
			</button>
			<button
				disabled={loading || insertLoading || updateLoading}
				className={`mr-4 p-2 border hover:bg-pink-300 ${
					voteAction === vote_action.down
						? 'bg-pink-500 text-white'
						: 'text-gray-600'
				}`}
				onClick={() => {
					if (voteAction === undefined) {
						insertVote({
							variables: { vote: vote_action.down, id: question_id },
							refetchQueries: [
								{
									query: FETCH_DATA,
									variables: { question_id, current_user_id },
								},
							],
						});
					} else {
						updateVote({
							variables: {
								vote:
									voteAction === vote_action.down
										? vote_action.none
										: vote_action.down,
								id: question_id,
								current_user_id,
							},
							refetchQueries: [
								{
									query: FETCH_DATA,
									variables: { question_id, current_user_id },
								},
							],
						});
					}
				}}
			>
				<IconArrowNarrowDown className="w-6 h-6" />
			</button>
			<span>
				{numeral(votes).format('0.[00]a')} vote
				{votes > 1 && 's'}
			</span>
		</div>
	);
};

export default QuestionVote;

const FETCH_DATA = gql`
	query MyQuery($question_id: uuid = "", $current_user_id: uuid = "") {
		forum_question_votes_aggregate(
			where: { forum_question_id: { _eq: $question_id } }
		) {
			aggregate {
				sum {
					vote
				}
			}
		}
		forum_question_votes(
			where: {
				forum_question_id: { _eq: $question_id }
				user_id: { _eq: $current_user_id }
			}
		) {
			vote
		}
	}
`;

const INSERT_VOTE = gql`
	mutation MyMutation($id: uuid = "", $vote: smallint = "") {
		insert_forum_question_votes_one(
			object: { forum_question_id: $id, vote: $vote }
		) {
			vote
		}
	}
`;

const UPDATE_VOTE = gql`
	mutation MyMutation(
		$id: uuid = ""
		$current_user_id: uuid = ""
		$vote: smallint = ""
	) {
		update_forum_question_votes(
			where: {
				forum_question_id: { _eq: $id }
				_and: { user_id: { _eq: $current_user_id } }
			}
			_set: { vote: $vote }
		) {
			returning {
				vote
			}
		}
	}
`;
