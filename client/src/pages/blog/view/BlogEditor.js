import React, { useState } from 'react';
import EditorContent from '../components/EditorContent';
import EditorImageCover from '../components/EditorImageCover';
import EditorInputTags from '../components/EditorInputTags';
import EditorMeunBar from '../components/EditorMeunBar';
import EditorPreview from '../components/EditorPreview';
import EditorTitle from '../components/EditorTitle';

export default function BlogEditor() {
	const contentInLocalStorage = JSON.parse(
		localStorage.getItem('editorContent')
	);
	const [showPreview, setShowPreview] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const [content, setContent] = useState('' || contentInLocalStorage?.content);
	const [tags, setTag] = useState('' || contentInLocalStorage?.tags);
	const [title, setTitle] = useState('' || contentInLocalStorage?.title);
	const [imgSrcCover, setImgSrcCover] = useState(
		'' || contentInLocalStorage?.imgSrcCover
	);

	const updateContent = (e) => {
		setContent(e.target.value);
		window.localStorage.setItem(
			'editorContent',
			JSON.stringify({ content: e.target.value, title, tags })
		);
	};

	const handleTag = (e) => {
		if (e.target.value.match(/[0-9A-Za-z, ]+/g) || e.target.value === '') {
			setTag(e.target.value.replace(/[^0-9a-z,]+/g, ''));
			window.localStorage.setItem(
				'editorContent',
				JSON.stringify({ content, title, tags: e.target.value })
			);
		}
	};
	const handleOnChangeTitle = (e) => {
		setTitle(e.target.value);
		window.localStorage.setItem(
			'editorContent',
			JSON.stringify({ content, title: e.target.value, tags })
		);
	};

	return (
		<div className="max-w-6xl min-h-screen mx-auto p-5">
			{/* <EditorMeunBar
				showPreview={showPreview}
				setShowPreview={setShowPreview}
				setErrorMessage={setErrorMessage}
				setContent={setContent}
			/>
			{errorMessage && (
				<div
					className="w-full mb-5 relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100"
					role="alert"
				>
					<p>{errorMessage}</p>
				</div>
			)}

			<EditorImageCover
				setImgSrcCover={setImgSrcCover}
				imgSrcCover={imgSrcCover}
				setErrorMessage={setErrorMessage}
				showPreview={showPreview}
			/> */}

			<EditorTitle />

			{!showPreview && <EditorInputTags handleTag={handleTag} tags={tags} />}

			{showPreview ? (
				<EditorPreview content={content} tags={tags || ''} title={title} />
			) : (
				<EditorContent updateContent={updateContent} content={content} />
			)}

			<hr />
			<button className=" bg-blue-500 text-white mt-2 px-14 py-3 rounded hover: tracking-wider transition-all">
				Publish
			</button>
		</div>
	);
}
