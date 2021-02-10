import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from '../../components/navbar';
import Footer from '../../components/Footer';
import ResetPassword from './ResetPassword';
import SetUpUsername from './SetUpUsername';
import SignIn from './SignIn';
import SignUp from './SignUp';
import VerifyEmail from './VerifyEmail';

export default function index() {
	return (
		<div>
			<NavigationBar />
			<Switch>
				<Route exact path="/auth/signin" component={SignIn} />
				<Route exact path="/auth/signup" component={SignUp} />
				<Route exact path="/auth/setupusername" component={SetUpUsername} />
				<Route exact path="/auth/forget-password" component={ResetPassword} />
				<Route exact path="/auth/verify-email" component={VerifyEmail} />
				<Redirect from="/auth*" to="/auth/signin" />
			</Switch>
			<Footer />
		</div>
	);
}
