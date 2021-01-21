import React from 'react';
import IconEdit from '../../../icons/ic_edit';
import IconEye from '../../../icons/ic_eye';
import IconImage from '../../../icons/ic_image';
import EditorMenu from './EditorMenu';

export default function EditorMeunBar({ showPreview, setShowPreview }) {
	return (
		<div className="border-b-2 p-5 flex justify-between sticky top-0 z-20 bg-white">
			<div className="flex items-center hover:tracking-wide transition-all cursor-pointer relative ">
				<IconImage filled className="w-8 h-8 cursor-pointer " />
				<span className=" ml-2 cursor-pointer">Upload</span>
				<input
					className="cursor-pointer absolute w-full  opacity-0"
					type="file"
					name="name"
				/>
			</div>
			{showPreview ? (
				<EditorMenu
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					text="Edit"
					icon={IconEdit}
				/>
			) : (
				<EditorMenu
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					text="Preview"
					icon={IconEye}
				/>
			)}
		</div>
	);
}
