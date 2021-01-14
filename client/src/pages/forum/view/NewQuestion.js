import { useState } from 'react';
import IconEdit from '../../../icons/ic_edit';
import IconPlus from '../../../icons/ic_plus';
import IconPreview from '../../../icons/ic_preview';
import QuestionEditor from '../components/QuestionEditor';
import QuestionPreview from '../components/QuestionPreview';
import generateListOfTagObject from '../utils/generateListOfTagObject';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import routes from '../../../constant/routes';

export default function NewQuestion() {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [listOfTags, setListofTags] = useState([]);
	const [isHidden, setHidden] = useState(true);

	const [createQuestion, { data, loading, error }] = useMutation(
		CREATE_QUESTION,
		{
			variables: {
				tags: generateListOfTagObject(listOfTags),
				title,
				content,
			},
		}
	);
	if (error) {
		return <h1>Error</h1>;
	}

	if (data && !loading) {
		history.push({ pathname: routes.forum, state: { justPosted: true } });
	}

	return (
		<>
			<div className="flex justify-between">
				{title && content ? (
					<button
						className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md flex items-center mb-2"
						onClick={createQuestion}
					>
						<IconPlus className="w-5 h-5" />
						<span className="ml-1 font-medium ">Post Question</span>
					</button>
				) : (
					<button className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md flex items-center mb-2 opacity-40">
						<IconPlus className="w-5 h-5" />
						<span className="ml-1 font-medium ">Post Question</span>
					</button>
				)}

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
					setTitle={setTitle}
					setContent={setContent}
					setListofTags={setListofTags}
					listOfTags={listOfTags}
				/>

				<QuestionPreview
					className={`${
						isHidden ? 'hidden' : 'block'
					} xl:block xl:w-6/12 w-full  xl:max-w-4xl`}
					title={title}
					content={content}
					listOfTags={listOfTags}
				/>
			</div>
		</>
	);
}

const CREATE_QUESTION = gql`
	mutation MyMutation(
		$content: String
		$title: String
		$tags: [forum_tags_insert_input!]!
	) {
		insert_forum_questions_one(
			object: { content: $content, title: $title, forum_tags: { data: $tags } }
		) {
			id
			title
		}
	}
`;
