import { useState } from 'react';
import IconHeart from '../../../icons/ic_heart';
import IconReply from '../../../icons/ic_reply';
import ReplyEditor from './ReplyEditor';

const ActionButtons = (props) => {
	const { liked } = props;

	const [isLiked, setIsLiked] = useState(liked);
	const [showButtons, setShowButtons] = useState(true);

	return (
		<>
			<div
				className={`transition-opacity flex items-center text-gray-600 space-x-6 ${
					showButtons ? 'opacity-100' : 'w-0 h-0 opacity-0'
				}`}
			>
				<div
					className={`flex items-center select-none hover:cursor-pointer transition-color duration-500 hover:text-blue-500 ${
						isLiked ? 'text-blue-500' : 'text-gray-600'
					}`}
					onClick={() => setIsLiked(!isLiked)}
				>
					<IconHeart className="w-6 h-6" filled={isLiked} />
					<span className="ml-1 font-medium">Like</span>
				</div>

				<div className="flex items-center hover:cursor-pointer">
					<IconReply className="w-5 h-5" />
					<span
						className="ml-1 font-medium"
						onClick={() => {
							setShowButtons(false);
						}}
					>
						Reply
					</span>
				</div>
			</div>

			<div
				className={`transition-opacity duration-1000 ${
					!showButtons ? 'opacity-100' : 'opacity-0 hidden'
				}`}
			>
				<ReplyEditor cancel={() => setShowButtons(true)} />
			</div>
		</>
	);
};

export default ActionButtons;
