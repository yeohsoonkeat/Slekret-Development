import EditorContent from '../components/editor/EditorContent';
import EditorAritcleCover from '../components/editor/EditorAritcleCover';
import EditorInputTags from '../components/editor/EditorInputTags';
import EditorMeunBar from '../components/editor/EditorMeunBar';
import EditorPreview from '../components/editor/EditorPreview';
import EditorTitle from '../components/editor/EditorTitle';
import EditorErrorAlert from '../components/editor/EditorErrorAlert';
import useEditorStateProvider from '../hook/useEditorStateProvider';

export default function BlogEditor() {
	const [editorState] = useEditorStateProvider();

	return (
		<div className="max-w-6xl min-h-screen mx-auto p-5">
			<EditorMeunBar />
			<EditorErrorAlert />
			<EditorAritcleCover />
			{editorState.showPreview ? (
				<EditorPreview />
			) : (
				<>
					<EditorTitle />
					<EditorInputTags />
					<EditorContent />
				</>
			)}
			<hr />
			<button className=" bg-blue-500 text-white mt-2 px-14 py-3 rounded hover: tracking-wider transition-all">
				Publish
			</button>
		</div>
	);
}
