import React from 'react';
import IconEdit from '../../../../icons/ic_edit';
import IconEye from '../../../../icons/ic_eye';
import IconImage from '../../../../icons/ic_image';
import ApiService from '../../../../service/api';
import useEditorStateProvider from '../../hook/useEditorStateProvider';
import EditorMenu from './EditorMenu';

const api = new ApiService();

export default function EditorMeunBar({ setErrorMessage, setContent }) {
	const [editorState, editorDispatch] = useEditorStateProvider();
	const showPreview = editorState.showPreview;

	const handleFileUpload = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		const res = await api
			.fileUpload('/file/file-upload', formData)
			.catch((e) => {
				window.open('/error/500', '_self');
			});

		if (res?.data?.fail) {
			editorDispatch({ type: 'SET_ERROR_MESSAGE', payload: res.data.message });
		} else {
			const image = `\n ![](${res.data.path})`;
			const content = editorState.blog.content + image;

			editorDispatch({ type: 'SET_BLOG_CONTENT', payload: content });
			window.localStorage.setItem(
				'blogEditor',
				JSON.stringify({ ...editorState.blog, content })
			);
			window.document
				.getElementById('editor-content')
				.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const setShowPreview = () => {
		editorDispatch({ type: 'TOGGLE_SHOW_PREVIEW' });
	};

	return (
		<div className="border-b-2 p-5 flex justify-between sticky top-0 z-20 bg-white">
			<div className="flex items-center hover:tracking-wide transition-all cursor-pointer relative ">
				<IconImage filled className="w-8 h-8 cursor-pointer " />
				<span className=" ml-2 cursor-pointer">Upload</span>
				<input
					className="cursor-pointer absolute w-full  opacity-0"
					type="file"
					name="image"
					accept=".jpg, .png, .jpeg, .gif"
					onChange={handleFileUpload}
				/>
			</div>
			{showPreview ? (
				<EditorMenu
					setShowPreview={setShowPreview}
					text="Edit"
					icon={IconEdit}
				/>
			) : (
				<EditorMenu
					setShowPreview={setShowPreview}
					text="Preview"
					icon={IconEye}
				/>
			)}
		</div>
	);
}
