import { useState } from 'react';
import Editor from 'rich-markdown-editor';
import IconComment from '../icons/ic_comment';
import IconHappy from '../icons/ic_happy';
import IconPhotograph from '../icons/ic_photograph';
import light from './MarkdownEditorTheme';

const MarkdownEditor = ({ hasTitle, placeholder }) => {
  const [justStarted, setJustStarted] = useState();

  return (
    <div className="bg-white px-10 pt-4 pb-24 rounded-lg">
      {hasTitle && (
        <div>
          <div className="py-2 flex space-x-4 select-none opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center text-gray-300 hover:text-gray-500">
              <IconHappy className="w-5 h-5" />
              <p className="font-medium">Add icon</p>
            </div>
            <div className="flex items-center text-gray-300 hover:text-gray-500">
              <IconPhotograph className="w-5 h-5" />
              <p className="font-medium">Add cover</p>
            </div>
            <div className="flex items-center text-gray-300 hover:text-gray-500">
              <IconComment className="w-5 h-5" />
              <p className="font-medium">Add comment</p>
            </div>
          </div>
          <input
            className="mb-6 text-4xl font-bold placeholder-gray-200 text-gray-800 focus:outline-none"
            placeholder="Untitled"
          />
        </div>
      )}
      <Editor placeholder="Write your explaination here..." theme={light} />
    </div>
  );
};

export default MarkdownEditor;
