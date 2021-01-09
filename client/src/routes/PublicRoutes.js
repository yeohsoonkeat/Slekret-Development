import { Route, Redirect } from 'react-router-dom'
export default function PublicRoutes({ auth, component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={() => {
				return !auth ? <Component /> : <Redirect to="/admin" />
			}}
		/>
	)
}
