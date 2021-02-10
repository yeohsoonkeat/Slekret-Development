import { gql, useMutation, useQuery } from '@apollo/client';
import formatDistance from 'date-fns/formatDistance';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import IconReply from '../../../../icons/ic_reply';
import Reply from '../Reply';
import UserAvatar from '../UserAvatar';
import AnswerVote from './AnswerVote';

const AnswerCard = ({ answer }) => {
	const { author } = answer;

	const replyContentRef = useRef();
	const [showReplyEditor, setShowReplyEditor] = useState(false);
	const [shownReplies, setShownReplies] = useState(2);

	const { loading, data } = useQuery(FETCH_DATA, {
		variables: { answer_id: answer.id },
	});

	const [insertReply, { loading: inserting }] = useMutation(INSERT_REPLY, {
		onCompleted(data) {
			setShowReplyEditor(false);
		},
	});

	if (loading) {
		return <h1>Loading...</h1>;
	}

	const replies = data.forum_answer_replies.map((reply) => {
		const { content, created_at: published_date, slekret_user } = reply;

		return {
			content,
			published_date,
			author: {
				username: slekret_user.username,
				avatar: slekret_user.avatar_src,
				display_name: slekret_user.displayname,
			},
		};
	});

	return (
		<div className="p-4 bg-white rounded-lg shadow-sm">
			<div className="flex relative">
				{replies.length > 0 && (
					<div className="w-12 border-l-2 border-b-2 h-full absolute top-6 left-6 rounded-bl-lg" />
				)}

				<Link to={`/@${author.username}`} className="z-10 h-12">
					<UserAvatar src={author.avatar} />
				</Link>

				<div className="ml-4 w-full">
					<div className="flex justify-between items-center w-full">
						<div>
							<div className="flex items-center">
								<Link to={`/@${author.username}`}>
									<p className="text-base font-bold tracking-normal text-gray-800">
										{author.display_name}
									</p>
								</Link>

								{answer.isAccepted && (
									<span className="ml-2 rounded-full bg-green-200 text-green-800 font-medium text-xs px-3 py-1">
										Best Answer
									</span>
								)}
							</div>
							<p className="text-xs font-medium text-gray-400">
								{formatDistance(new Date(answer.published_date), new Date(), {
									addSuffix: true,
								})}
							</p>
						</div>
						<AnswerVote answer_id={answer.id} />
					</div>

					<div className="py-3">
						<ReactMarkdown plugins={[remarkGfm]}>
							{answer.content}
						</ReactMarkdown>
						<div className="mt-2">
							{!showReplyEditor ? (
								<div className="flex items-center hover:cursor-pointer">
									<IconReply className="w-5 h-5" />
									<span
										className="ml-1 font-medium"
										onClick={() => {
											setShowReplyEditor(true);
										}}
									>
										Reply
									</span>
								</div>
							) : (
								<div>
									<textarea
										ref={replyContentRef}
										className="w-full h-40 rounded-lg p-4 resize-none focus:outline-none border"
										placeholder="Write your answer here..."
									/>
									<div className="mt-2 flex justify-end items-center space-x-2">
										<button
											disabled={inserting}
											className="px-4 py-2 rounded-md text-sm"
											onClick={() => {
												setShowReplyEditor(false);
											}}
										>
											Cancel
										</button>
										<button
											disabled={inserting}
											className="px-4 py-2 rounded-md text-sm border bg-blue-600 disabled:opacity-20 text-white"
											onClick={() => {
												const content = replyContentRef.current.value;
												insertReply({
													variables: {
														content,
														answer_id: answer.id,
														replying_to_user_id: null,
													},
													refetchQueries: [
														{
															query: FETCH_DATA,
															variables: { answer_id: answer.id },
														},
													],
												});
											}}
										>
											Reply
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="pl-16">
				{replies.slice(0, shownReplies).map((reply, index) => {
					return (
						<Reply
							key={index}
							hasNext={index < replies.length - 1}
							reply={reply}
						/>
					);
				})}

				{replies.length > shownReplies && (
					<div className="group w-full hover:bg-gray-100 px-6 py-3 flex items-center select-none">
						<div className="flex flex-col space-y-1">
							<div className="rounded-full w-1 h-1 bg-gray-300 group-hover:bg-gray-600"></div>
							<div className="rounded-full w-1 h-1 bg-gray-300 group-hover:bg-gray-600"></div>
							<div className="rounded-full w-1 h-1 bg-gray-300 group-hover:bg-gray-600"></div>
						</div>

						<button
							className="ml-10 text-sm text-blue-400 group-hover:text-blue-500 group-hover:font-medium group-hover:tracking-wide transition-all"
							onClick={() => setShownReplies((current) => current + 10)}
						>
							Show replies
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AnswerCard;

const FETCH_DATA = gql`
	query MyQuery($answer_id: uuid = "") {
		forum_answer_replies(
			where: { forum_question_answer_id: { _eq: $answer_id } }
		) {
			id
			content
			created_at
			slekret_user {
				avatar_src
				displayname
				username
			}
		}
	}
`;

const INSERT_REPLY = gql`
	mutation MyMutation(
		$content: String = ""
		$answer_id: uuid = ""
		$replying_to_user_id: uuid = ""
	) {
		insert_forum_answer_replies_one(
			object: {
				content: $content
				forum_question_answer_id: $answer_id
				replying_to_user_id: $replying_to_user_id
			}
		) {
			id
		}
	}
`;
