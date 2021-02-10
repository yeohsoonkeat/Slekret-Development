import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import ModalRequireAuth from '../../../components/ModalRequireAuth';
import useAuthProvider from '../../../hook/useAuthProvider';
import { v4 as uuidv4 } from 'uuid';

const AddNewComment = ({ blogId, setListOfComment, setNumberOfComments }) => {
	const [showModal, setShowModal] = useState(false);
	const [commentContent, setCommentContent] = useState('');
	const [authState] = useAuthProvider();
	const commentId = uuidv4();

	const [addNewComent] = useMutation(ADD_NEW_COMMENT, {
		onCompleted(addNewComent) {
			if (addNewComent) {
				const newComment = {
					id: commentId,
					content: commentContent,
					created_at: new Date(),
					slekret_user: {
						id: authState.user.id,
						username: authState.user.username,
						avatar_src: authState.user.avatar_src,
						displayname: authState.user.username,
					},
				};
				setListOfComment((comments) => [newComment, ...comments]);
				setNumberOfComments((numberOfCommets) => numberOfCommets + 1);
				setCommentContent('');
			}
		},
	});

	const handleOnChange = (e) => {
		setCommentContent(e.target.value);
	};

	const handleOnClick = () => {
		if (!authState.auth) {
			return setShowModal(true);
		}
		if (commentContent.trim()) {
			addNewComent({
				variables: { blogId, content: commentContent, commentId },
			});
		}
	};
	const handleOnfucus = () => {
		if (!authState.auth) {
			window.document.getElementById('comment-editor').blur();
			setShowModal(true);
		}
	};

	return (
		<>
			<div className="mb-10">
				<textarea
					className="h-56 w-full mx-auto resize-none p-5 border rounded shadow"
					placeholder="leave a comment here"
					onChange={handleOnChange}
					value={commentContent}
					onFocus={handleOnfucus}
					id="comment-editor"
				/>
				<div>
					<button
						className="bg-blue-500 py-3 px-5 uppercase text-white font-bold rounded"
						onClick={handleOnClick}
						disabled={!commentContent}
					>
						Add Comment
					</button>
				</div>
			</div>
			{showModal && <ModalRequireAuth setShowModal={setShowModal} />}
		</>
	);
};

const ADD_NEW_COMMENT = gql`
	mutation MyMutation($blogId: uuid, $content: String, $commentId: uuid) {
		insert_blog_article_comments_one(
			object: { content: $content, blog_article_id: $blogId, id: $commentId }
		) {
			id
		}
	}
`;

export default AddNewComment;
