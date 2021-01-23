import React from 'react';
import ApiService from '../../../service/api';

const api = new ApiService();

export default function EditorImageCover({
	imgSrcCover,
	setErrorMessage,
	setImgSrcCover,
	showPreview,
}) {
	const handleFileUpload = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		const res = await api
			.fileUpload('/file/file-upload', formData)
			.catch((e) => {
				window.open('/error/500', '_self');
			});

		if (res?.data?.fail) {
			setErrorMessage(res.data.message);
		} else {
			setErrorMessage('');
			setImgSrcCover(res.data.path);
			const contentInLocalStorage = JSON.parse(
				localStorage.getItem('editorContent')
			);
			window.localStorage.setItem(
				'editorContent',
				JSON.stringify({
					...contentInLocalStorage,
					imgSrcCover: res.data.path,
				})
			);
		}
	};

	const removeImageCover = async () => {
		const filename = imgSrcCover.replace(/^(.*[\\/])/, '');
		const res = await api
			.removeFile('/file/remove-file', {
				filename,
			})
			.catch((err) => {
				return window.open('/error/500', '_self');
			});
		if (res?.data?.fail) {
			setErrorMessage(res.data.message);
		} else {
			setImgSrcCover('');
			const contentInLocalStorage = JSON.parse(
				localStorage.getItem('editorContent')
			);
			delete contentInLocalStorage.imgSrcCover;
			window.localStorage.setItem(
				'editorContent',
				JSON.stringify(contentInLocalStorage)
			);
		}
	};

	return (
		<div className="w-full h-80 border-2 flex items-center justify-center cursor-pointer hover:tracking-wide transition-all relative">
			{imgSrcCover ? (
				<>
					<img
						src={imgSrcCover}
						alt=""
						className="w-full h-full object-cover object-center"
					/>

					{!showPreview && (
						<button
							onClick={removeImageCover}
							className=" bg-red-500 text-white cursor-pointer border-2 px-10 py-4 absolute focus:outline-none  hover:tracking-wide transition-all hover:shadow"
						>
							change
						</button>
					)}
				</>
			) : (
				<div>
					<h1 className="cursor-pointer border-2 px-10 py-4">AddCover</h1>
					<input
						className="cursor-pointer w-full h-full opacity-0 absolute top-0"
						type="file"
						name="image"
						onChange={handleFileUpload}
					/>
				</div>
			)}
		</div>
	);
}
