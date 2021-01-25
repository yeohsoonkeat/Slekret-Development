import React, { useReducer } from 'react';
import { reducer, initialState } from './editorState';
const EditorStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<EditorContext.Provider value={[state, dispatch]}>
			{children}
		</EditorContext.Provider>
	);
};
export const EditorContext = React.createContext();

export default EditorStateProvider;
