import IconEmail from '../../../icons/ic_email';
import IconEye from '../../../icons/ic_eye';
import IconPassword from '../../../icons/ic_password';
import IconUser from '../../../icons/ic_user';

const content = {
	signupForm: [
		{
			type: 'email',
			name: 'email',
			placeholder: 'example@gmail.com',
			icon: IconEmail,
		},
		{
			type: 'text',
			name: 'username',
			placeholder: 'username',
			icon: IconUser,
		},
		{
			type: 'text',
			name: 'displayname',
			placeholder: 'display Name',
			icon: IconUser,
		},
	],
	passwordInputs: [
		{
			type: 'password',
			name: 'password',
			placeholder: 'Password',
			firstIcon: IconPassword,
			lostIcon: IconEye,
		},
		{
			type: 'password',
			name: 'confirm-password',
			placeholder: 'Confirm password',
			firstIcon: IconPassword,
			lostIcon: IconEye,
		},
	],
	loginForm: [
		{
			type: 'email',
			name: 'email',
			placeholder: 'example@gmail.com',
		},
		{
			type: 'password',
			name: 'password',
			placeholder: 'password',
		},
	],
	usernameForm: [
		{
			type: 'text',
			name: 'username',
			placeholder: 'username',
			icon: IconUser,
		},
		{
			type: 'text',
			name: 'displayname',
			placeholder: 'Display Name',
			icon: IconUser,
		},
	],
	forgetPasswordForm: [
		{
			type: 'email',
			name: 'email',
			placeholder: 'Email Address',
		},
		{
			type: 'password',
			name: 'password',
			placeholder: 'password',
		},
		{
			type: 'password',
			name: 'confirmPassword',
			placeholder: 'Confirm Password',
		},
	],
};

export default content;
