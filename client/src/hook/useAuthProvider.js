import { useContext } from 'react'
import { AuthContext } from '../provider/auth/authProvider'

const useAuthProvider = () => {
	const authProvider = useContext(AuthContext)
	return authProvider
}
export default useAuthProvider
