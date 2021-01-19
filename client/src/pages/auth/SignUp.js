import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonAuth from './components/ButtonAuth';
import ButtonSocial from './components/ButtonSocial';
import Container from './components/Container';
import Footer from './components/Footer';
import Input from './components/Input';
import Title from './components/Title';
import content from './constant/form';
import LayoutForm from './Layout/LayoutForm';
import signUpSchema from './schema/signUpSchema';
import ErrorMessage from './components/ErrorMessage';
import InputPassword from './components/InputPassword';
import AlertError from './components/AlertError';
import ApiService from '../../service/api';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingForm from './components/LoadingForm';
import config from '../../config';
import Divider from './components/Divider';

const api = new ApiService();

export default function SignUp() {
	const history = useHistory();
	const location = useLocation();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(signUpSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const res = await api.register('/auth/register', data).catch((err) => {
			history.push('/error/500');
		});

		setMessage(res?.data?.message);
		setLoading(false);
		if (res?.data?.emailSent) {
			history.push({
				pathname: '/auth/verify-email',
				state: {
					user: data,
					verifyPath: '/auth/register',
					prevPath: location.pathname,
				},
			});
		}
	};

	const handleAuthGithub = () => {
		setLoading(true);
		window.open(config.backendUrl + '/auth/github', '_self');
	};

	return (
		<LayoutForm>
			<AlertError message={message} />
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
							name="password"
							placeholder="password"
							isError={errors.password?.message}
							refForm={register}
						/>
						<ErrorMessage message={errors.password?.message} />
						<InputPassword
							name="confirm-password"
							placeholder="confirm password"
							refForm={register}
							isError={errors['confirm-password']?.message}
						/>
						<ErrorMessage message={errors['confirm-password']?.message} />

						<ButtonAuth value={'Sign Up'} />
						<ErrorMessage message="" />
					</form>
					<Divider />
					<div onClick={handleAuthGithub}>
						<ButtonSocial
							title={'github'}
							imgSrc={process.env.PUBLIC_URL + '/assets/github.svg'}
						/>
					</div>

					<Footer
						content={'Already have an account?'}
						path="/auth/signin"
						text="Sign in"
					/>
				</div>
				<LoadingForm loading={loading} />
			</Container>
		</LayoutForm>
	);
}
