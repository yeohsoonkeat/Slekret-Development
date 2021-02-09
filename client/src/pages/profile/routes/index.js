import { Route, Switch } from 'react-router-dom';
import ProfileSettingLayout from '../layout/ProfileSettingLayout';
import { ProfilePage } from '../views/';
import ProfileSetting from '../views/ProfileSetting';
// import ProfileSettingChangePassword from '../views/ProfileSettingChangePassword';

export default function ProfileRoute() {
	return (
		<Switch>
			<Route path="/user/profile/:username" exact component={ProfilePage} />

			<ProfileSettingLayout>
				<Route path="/user/setting/" exact component={ProfileSetting} />
				{/* <Route
					path="/user/setting/change-password"
					exact
					component={ProfileSettingChangePassword}
				/> */}
			</ProfileSettingLayout>
		</Switch>
	);
}
