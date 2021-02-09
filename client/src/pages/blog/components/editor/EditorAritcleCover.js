import React from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../../../service/api';
import useEditorStateProvider from '../../hook/useEditorStateProvider';

const api = new ApiService();

export default function EditorImageCover() {
	const location = useLocation();
	const isEdit = location.pathname === '/blog/edit';

	const [editorState, editorDispatch] = useEditorStateProvider();
	const articleCover = editorState.blog.articleCover;
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
			editorDispatch({
				type: 'SET_BLOG_ARTICLE_COVER',
				payload: res.data.path,
			});
			window.localStorage.setItem(
				location.pathname,
				JSON.stringify({ ...editorState.blog, articleCover: res.data.path })
			);
		}
	};

	const removeImageCover = async () => {
		const filename = articleCover.replace(/^(.*[\\/])/, '');
		const res = await api
			.removeFile('/file/remove-file', {
				filename,
			})
			.catch((err) => {
				return window.open('/error/500', '_self');
			});
		if (res?.data?.fail) {
			editorDispatch({ type: 'SET_ERROR_MESSAGE', payload: res.data.message });
		} else {
			editorDispatch({
				type: 'SET_BLOG_ARTICLE_COVER',
				payload: '',
			});
			delete editorState.blog.articleCover;
			window.localStorage.setItem(
				location.pathname,
				JSON.stringify({ ...editorState.blog })
			);
		}
	};

	const changeImageCover = () => {
		editorDispatch({ type: 'REMOVE_BLOG_ARTICLE_COVER' });
	};

	return (
		<div className="h-80 relative flex items-center justify-center border-2">
			{articleCover ? (
				<>
					<img
						src={articleCover}
						alt=""
						className="w-full h-full object-cover object-center"
					/>

					{!showPreview && (
						<div className="absolute">
							{isEdit ? (
								<button
									onClick={changeImageCover}
									className=" bg-red-500 text-white cursor-pointer border-2 px-10 py-4  focus:outline-none  hover:tracking-wide transition-all hover:shadow"
								>
									change
								</button>
							) : (
								<button
									onClick={removeImageCover}
									className=" bg-red-500 text-white cursor-pointer border-2 px-10 py-4 focus:outline-none  hover:tracking-wide transition-all hover:shadow"
								>
									change
								</button>
							)}
						</div>
					)}
				</>
			) : (
				<>
					<h1 className="cursor-pointer border-2 px-10 py-4">AddCover</h1>
					<input
						className="cursor-pointer w-full h-full opacity-0 absolute top-0"
						type="file"
						name="image"
						onChange={handleFileUpload}
						accept=".jpg, .png, .jpeg, .gif"
					/>
				</>
			)}
		</div>
	);
}
