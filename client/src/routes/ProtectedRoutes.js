import { Route, Redirect } from 'react-router-dom'
export default function ProtectedRoute({
	auth,
	component: Component,
	...rest
}) {
	const isAuth = window.localStorage.getItem('auth') === 'true' || auth

	return (
		<Route
			{...rest}
			render={() => {
				return isAuth ? <Component /> : <Redirect to="/auth" />
			}}
		/>
	)
}
