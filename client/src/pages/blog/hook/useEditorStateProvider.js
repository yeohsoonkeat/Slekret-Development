import { useContext } from 'react';
import { EditorContext } from '../provider/editor/editorStateProvider';

const useEditorStateProvider = () => {
	const editorStateProvider = useContext(EditorContext);
	return editorStateProvider;
};
export default useEditorStateProvider;
