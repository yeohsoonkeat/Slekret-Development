import { Route, Switch } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import { ProfilePage } from '../views/';
import ProfileSetting from '../views/ProfileSetting';
import ProfileSettingChangePassword from '../views/ProfileSettingChangePassword';

export default function ProfileRoute() {
	return (
		<Switch>
			<Route path="/user/profile/:username" exact component={ProfilePage} />

		
				<Route path="/user/setting/" exact component={ProfileSetting} />
				<Route
					path="/user/setting/change-password"
					exact
					component={ProfileSettingChangePassword}
				/>
				<Route component={NotFound}/>
		</Switch>
	);
}
