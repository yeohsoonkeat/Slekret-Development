import { Route, Switch } from 'react-router-dom';
import Home from '../view'

export default function ProfileRoute() {
	return (
		<Switch>
			<Route path="/" component={Home}/>
		</Switch>
	);
}
