import React, { useReducer } from 'react'
import { reducer, initialState } from './authState'
const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<AuthContext.Provider value={[state, dispatch]}>
			{children}
		</AuthContext.Provider>
	)
}
export const AuthContext = React.createContext()

export default AuthProvider
