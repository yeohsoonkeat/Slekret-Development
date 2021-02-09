import { Route, Switch } from 'react-router-dom';
import { ProfilePage } from '../views/';
import ProfileSetting from '../views/ProfileSetting';

export default function ProfileRoute() {
	return (
		<Switch>
			<Route path="/user/setting" exact component={ProfileSetting} />
			<Route path="/user/:username" exact component={ProfilePage} />
		</Switch>
	);
}
