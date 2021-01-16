import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import content from '../static';
import axios from 'axios';
import useAuthProvider from '../../../hook/useAuthProvider';
import config from '../../../config';

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(2),
});

const Login = () => {
	const history = useHistory();

	const authDispatch = useAuthProvider()[1];
	const [message, setMessage] = useState('');
	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		const res = await axios.post(config.backendUrl + '/auth/login', data, {
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
		});
		if (!res.data.auth) {
			setMessage(res.data.message);
		} else {
			authDispatch({
				type: 'UPDATE_AUTH',
				payload: { auth: res.data?.auth },
			});
			window.localStorage.setItem('auth', res.data?.auth);
			window.open("/","_self")
		}
	};
	const githubAuth = () => {
		window.open(config.backendUrl + '/auth/github', '_self');
	};

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-4/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-3">
									<h6 className="text-gray-600 text-sm font-bold">
										Sign in with
									</h6>
								</div>
								<div className="btn-wrapper text-center">
									<button
										className="	 bg-white text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150 mr-2"
										type="button"
										onClick={githubAuth}
									>
										<img
											alt="github"
											className="w-5 mr-1"
											src={process.env.PUBLIC_URL + '/assets/github.svg'}
										/>
										Github
									</button>
								</div>
								<hr className="mt-6 border-b-1 border-gray-400" />
							</div>
							<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
								<div className="text-gray-500 text-center mb-3 font-bold">
									<small>Or sign in with credentials</small>
								</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									{content.loginForm.map((input, index) => {
										return (
											<div className="relative w-full mb-3" key={index}>
												<label
													className="block uppercase text-gray-700 text-xs font-bold mb-2"
													htmlFor="grid-password"
												>
													{input.name}
												</label>
												<input
													ref={register}
													name={input.name}
													type={input.type}
													className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
													placeholder={input.placeholder}
													autoComplete="true"
												/>
												<p className="text-red-700">
													{errors[input.name]?.message}
												</p>
											</div>
										);
									})}

									<div className="text-center mt-6">
										<input
											className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 cursor-pointer"
											type="submit"
											value="Login"
										/>
									</div>
								</form>
								<p className="text-red-700 text-center">{message}</p>
							</div>
						</div>
						<div className="flex flex-wrap mt-6 relative text-xl">
							<div className="w-1/2">
								<Link to="/auth/forgetpassword" className="text-gray-300">
									<small>Forgot password?</small>
								</Link>
							</div>
							<div className="w-1/2 text-right">
								<Link to="/auth/register" className="text-gray-300">
									<small className="underline">Create new account</small>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
