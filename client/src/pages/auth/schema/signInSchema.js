import * as yup from 'yup';

const signInSchema = yup.object().shape({
	email: yup.string().required().trim().email(),
	password: yup
		.string()
		.required()
		.min(6)
		.max(25)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/g,
			'Invalid password'
		),
});

export default signInSchema;
