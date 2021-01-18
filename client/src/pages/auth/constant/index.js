import IconEmail from '../../../icons/ic_email';
import IconPassword from '../../../icons/ic_password';
import IconUser from '../../../icons/ic_user';

const content = {
	signupForm: [
		{
			type: 'email',
			name: 'email',
			placeholder: 'Example@gmail.com',
			icon: IconEmail,
		},
		{
			type: 'password',
			name: 'password',
			placeholder: 'Password',
			icon: IconPassword,
		},
		{
			type: 'password',
			name: 'confirm-password',
			placeholder: 'Confirm password',
			icon: IconPassword,
		},
		{
			type: 'text',
			name: 'username',
			placeholder: 'Username',
			icon: IconUser,
		},
		{
			type: 'text',
			name: 'displayname',
			placeholder: 'Display Name',
			icon: IconUser,
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
