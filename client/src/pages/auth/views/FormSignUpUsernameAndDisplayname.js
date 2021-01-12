import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import content from '../static';
import config from '../../../config';

const schema = yup.object().shape({
	username: yup
		.string()
		.required()
		.max(25)
		.matches(/^\w+$/g, 'Allow only characters and numbers'),
	displayname: yup.string().required().trim().max(25),
});

export default function FormSignUpUsernameAndDisplayname() {
	const [message, setMessage] = useState('');
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const res = await axios.post(config.backendUrl + '/auth/username', data, {
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
		});
		setMessage(res.data?.message);
		if (res.data?.fail) {
			history.push('/auth/register');
		}
		if (res.data?.auth) {
			window.open('/', '_self');
		}
	};
	return (
		<div className="container mx-auto px-4 h-full">
			<div className="flex content-center items-center justify-center h-full">
				<div className="w-full lg:w-4/12 px-4">
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
						<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
							<div className="text-gray-500 text-center mb-3 font-bold">
								<p className="text-red-500 mt-2">{message}</p>
								<form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
									{content.usernameForm.map((input, index) => {
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
											className="bg-green-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 cursor-pointer"
											type="submit"
											value="submit"
										/>
										<Link to="/auth/register" className="mt-2 underline">
											back
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 relative text-xl">
						<div className="w-full text-center">
							<Link to="/auth/login" className="text-gray-300">
								<small className="underline">Already have an account?</small>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
