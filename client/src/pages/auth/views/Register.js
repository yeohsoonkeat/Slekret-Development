import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AlreadyHaveAccount from '../components/AlreadyHaveAccount';
import SocailAuth from '../components/SocailAuth';
import content from '../static';
import { useHistory } from 'react-router-dom';
import config from '../../../config';

const schema = yup.object().shape({
	username: yup
		.string()
		.required()
		.trim()
		.max(25)
		.matches(/^\w+$/g, 'Allow only characters and numbers'),
	displayname: yup.string().required().trim().max(25),
	email: yup.string().email().required(),
	password: yup.string().required().min(2),
});

export default function Register() {
	const [message, setMessage] = useState('');
	const history = useHistory();

	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		const res = await axios
			.post(config.backendUrl + '/auth/register', data, {
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
			.catch((er) => console.log());
		if (res.data?.verify) {
			history.push({ pathname: '/auth/verify', state: { data } });
		}
		if (res.data.message) {
			setMessage(res.data.message);
		}
	};
	const githubAuth = () => {
		window.open(config.backendUrl + '/auth/github', '_self');
	};
	return (
		<div className="container mx-auto px-4 h-full">
			<div className="flex content-center items-center justify-center h-full">
				<div className="w-full lg:w-4/12 px-4">
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
						<div className="rounded-t mb-0 px-6 py-6">
							<div className="text-center mb-3">
								<h6 className="text-gray-600 text-sm font-bold">
									Sign Up with
								</h6>
							</div>
							<SocailAuth githubAuth={githubAuth} />
							<hr className="mt-6 border-b-1 border-gray-400" />
						</div>
						<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
							<div className="text-gray-500 text-center mb-3 font-bold">
								<small>Or Sign up with credentials</small>
								<form onSubmit={handleSubmit(onSubmit)}>
									{content.form.map((input, index) => {
										return (
											<div className="relative w-full mb-3" key={index}>
												<label
													className="block uppercase text-gray-700 text-xs font-bold mb-2 text-left"
													htmlFor="grid-password"
												>
													{input.name}
												</label>
												<input
													name={input.name}
													ref={register}
													type={input.type}
													className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
													placeholder={input.placeholder}
													autoComplete="true"
												/>
												<p className=" text-red-500">
													{errors[input.name]?.message}
												</p>
											</div>
										);
									})}
									<div className="text-center mt-6">
										<input
											className="w-full bg-black focus:outline-none text-white rounded p-2 cursor-pointer"
											type="submit"
											value="Register"
										/>
										<p className=" mt-2 text-red-400">{message}</p>
									</div>
								</form>
							</div>
						</div>
					</div>
					<AlreadyHaveAccount />
				</div>
			</div>
		</div>
	);
}
