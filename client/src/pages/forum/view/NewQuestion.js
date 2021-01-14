import { useState } from 'react';
import IconEdit from '../../../icons/ic_edit';
import IconPlus from '../../../icons/ic_plus';
import IconPreview from '../../../icons/ic_preview';
import QuestionEditor from '../components/QuestionEditor';
import QuestionPreview from '../components/QuestionPreview';

export default function NewQuestion() {
	const [questionTitle, setQuestionTitle] = useState('');
	const [questionDescription, setQuestionDescription] = useState('');
	const [listOfTags, setListofTags] = useState([]);
	const [isHidden, setHidden] = useState(true);

	const handleAskQuestion = () => {};

	return (
		<>
			<div className="flex justify-between">
				<button
					className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md flex items-center mb-2"
					onClick={handleAskQuestion}
				>
					<IconPlus className="w-5 h-5" />
					<span className="ml-1 font-medium ">Post Question</span>
				</button>
				<button
					className="ml-2 px-4 py-2  ring-2  text-sm  rounded-md flex items-center mb-2 hover:bg-blue-500 hover:text-white hover:outline-none xl:hidden"
					onClick={() => setHidden(!isHidden)}
				>
					{!isHidden ? (
						<>
							<IconEdit className="w-5 h-5" strokeWidth={2} />
							<span className="ml-1 font-medium">Edit</span>
						</>
					) : (
						<>
							<IconPreview className="w-5 h-5" strokeWidth={2} />
							<span className="ml-1 font-medium ">Preview</span>
						</>
					)}
				</button>
			</div>

			<div className="h-screen w-full  bg-white flex ">
				<QuestionEditor
					className={`${
						isHidden ? 'block' : 'hidden'
					} xl:block xl:w-6/12 w-full   `}
					setQuestionTitle={setQuestionTitle}
					setQuestionDescription={setQuestionDescription}
					setListofTags={setListofTags}
					listOfTags={listOfTags}
				/>

				<QuestionPreview
					className={`${
						isHidden ? 'hidden' : 'block'
					} xl:block xl:w-6/12 w-full  xl:max-w-4xl`}
					questionTitle={questionTitle}
					questionDescription={questionDescription}
					listOfTags={listOfTags}
				/>
			</div>
		</>
	);
}
