import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonAuth from './components/ButtonAuth';
import ButtonSocial from './components/ButtonSocial';
import Container from './components/Container';
import Footer from './components/Footer';
import Input from './components/Input';
import Title from './components/Title';
import content from './constant';
import LayoutForm from './Layout/LayoutForm';
import signUpSchema from './schema/signUpSchema';
import ErrorMessage from './components/ErrorMessage';
import IconEye from '../../icons/ic_eye';
import IconPassword from '../../icons/ic_password';
import InputPassword from './components/InputPassword';
import AlertError from './components/AlertError';
import ApiService from '../../service/api';
import { useHistory } from 'react-router-dom';

const api = new ApiService();

export default function SignUp() {
	const history = useHistory();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(signUpSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const res = await api.register('/auth/register', data);
		setMessage(res?.data?.message);
		setLoading(false);
		if (res?.data?.emailSent) {
			history.push({ pathname: '/auth/verify-email', state: data });
		}
	};

	return (
		<LayoutForm>
			{message && <AlertError message={message} />}
			<Container>
				<div className="p-5">
					<Title value={'Sign Up'} />
					<form onSubmit={handleSubmit(onSubmit)}>
						{content.signupForm.map((input, index) => {
							return (
								<div key={index}>
									<Input
										placeholder={input.placeholder}
										name={input.name}
										icon={input.icon}
										type={input.type}
										refForm={register}
										isError={errors[input.name]?.message}
									/>
									<ErrorMessage message={errors[input.name]?.message} />
								</div>
							);
						})}
						<InputPassword
							firstIcon={IconPassword}
							lastIcon={IconEye}
							name="password"
							placeholder="password"
							isError={errors.password?.message}
							refForm={register}
						/>
						<ErrorMessage message={errors.password?.message} />
						<InputPassword
							firstIcon={IconPassword}
							lastIcon={IconEye}
							name="confirm-password"
							placeholder="confirm password"
							refForm={register}
							isError={errors['confirm-password']?.message}
						/>
						<ErrorMessage message={errors['confirm-password']?.message} />

						<ButtonAuth value={'Sign Up'} />
						<ErrorMessage message="" />
					</form>

					<p className="text-center mt-5 text-sm">or sign up with</p>
					<ButtonSocial
						value={'github'}
						imgSrc={process.env.PUBLIC_URL + '/assets/github.svg'}
					/>
					<Footer content={'Already have an account?'} path="/auth/signin" />
				</div>
				{loading && (
					<div className="absolute top-0 left-0 w-full h-full animate-pulse bg-blue-50 flex items-center justify-center">
						<h1>Loading..</h1>
					</div>
				)}
			</Container>
		</LayoutForm>
	);
}
