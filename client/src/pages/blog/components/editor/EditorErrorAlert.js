import React from 'react';
import useEditorStateProvider from '../../hook/useEditorStateProvider';

export default function EditorErrorAlert() {
	const [editorState] = useEditorStateProvider();
	const errorMessage = editorState.errorMessage;
	return (
		<>
			{errorMessage ? (
				<div
					className="w-full mb-5 relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100"
					role="alert"
				>
					<p>{errorMessage}</p>
				</div>
			) : (
				''
			)}
		</>
	);
}
