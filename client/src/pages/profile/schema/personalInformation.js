import * as yup from 'yup';

const personalInformation = yup.object().shape({
	username: yup
		.string()
		.required()
		.trim()
		.max(25)
		.matches(/^\w+$/g, 'Allow only characters and numbers'),
	displayname: yup.string().required().trim().max(25),
});

export default personalInformation;
