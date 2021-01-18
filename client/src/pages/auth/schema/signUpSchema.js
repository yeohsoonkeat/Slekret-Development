import * as yup from 'yup';

const signUpSchema = yup.object().shape({
	username: yup
		.string()
		.required()
		.trim()
		.max(25)
		.matches(/^\w+$/g, 'Allow only characters and numbers'),
	displayname: yup.string().required().trim().max(25),
	email: yup.string().email().required(),
	password: yup
		.string()
		.required()
		.min(6)
		.max(25)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/g,
			'Password should contains atleast one uppercase, one lowercase and one number'
		),
	'confirm-password': yup
		.string()
		.required()
		.min(6)
		.max(25)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/g,
			'Password should contains atleast one uppercase, one lowercase and one number'
		),
});

export default signUpSchema;
