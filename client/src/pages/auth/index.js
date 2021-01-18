import { Route, Switch, Redirect } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import SetUpUsername from './SetUpUsername';
import SignIn from './SignIn';
import SignUp from './SignUp';
import VerifyEmail from './VerifyEmail';

export default function index() {
	return (
		<Switch>
			<Route exact path="/auth/signin" component={SignIn} />
			<Route exact path="/auth/signup" component={SignUp} />
			<Route exact path="/auth/username" component={SetUpUsername} />
			<Route exact path="/auth/reset-password" component={ResetPassword} />
			<Route exact path="/auth/verify-email" component={VerifyEmail} />

			<Redirect from="/auth*" to="/auth/signin" />
		</Switch>
	);
}
