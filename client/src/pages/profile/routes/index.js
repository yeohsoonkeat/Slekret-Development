import { Route, Switch } from 'react-router-dom';
import {ProfilePage, ProfileSettingPage} from '../views/'

export default function ProfileRoute() {
	return (
		<Switch>
			<Route path="/user/:id" exact component={ProfilePage}/>
			<Route path="/user/:id/setting" exact component={ProfileSettingPage}/>
		</Switch>
	);
}
