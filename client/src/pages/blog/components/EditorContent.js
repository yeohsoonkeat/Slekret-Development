import React from 'react';

export default function EditorContent({ updateContent, content, onKeyBind }) {
	return (
		<>
			<textarea
				className={`w-full focus:outline-none p-5 overflow-scroll resize-none h-screen border`}
				autoFocus={true}
				onChange={updateContent}
				value={content}
				placeholder="You content go here as markdown...."
				onKeyDown={onKeyBind}
				id="editor-content"
			/>
		</>
	);
}
