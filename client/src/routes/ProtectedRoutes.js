import { Route, Redirect } from 'react-router-dom'
export default function ProtectedRoute({
	auth,
	component: Component,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={() => {
				return auth ? <Component /> : <Redirect to="/auth" />
			}}
		/>
	)
}
