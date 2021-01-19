import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import IconMail from '../../icons/icon_mail';
import ButtonAuth from './components/ButtonAuth';
import ButtonSocial from './components/ButtonSocial';
import Container from './components/Container';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import Input from './components/Input';
import InputPassword from './components/InputPassword';
import LoadingForm from './components/LoadingForm';
import Title from './components/Title';
import LayoutForm from './Layout/LayoutForm';
import signInSchema from './schema/signInSchema';
import ApiService from '../../service/api';
import AlertError from './components/AlertError';
import config from '../../config';
import Divider from './components/Divider';
const api = new ApiService();

export default function SignIn() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(signInSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const res = await api.login('/auth/login', data).catch(() => {
			return history.push('/error/500');
		});

		if (!res?.data?.auth) {
			setLoading(false);
			setMessage(res.data.message);
		} else {
			window.localStorage.setItem('auth', 'true');
			window.open('/', '_self');
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
					<Title value={'Sign In'} />
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							placeholder="Email"
							icon={IconMail}
							type="text"
							name="email"
							refForm={register}
						/>
						<ErrorMessage message={errors?.email?.message} />
						<InputPassword
							placeholder="Password"
							refForm={register}
							name="password"
							isError={errors?.password?.message}
						/>
						<ErrorMessage message={errors?.password?.message} />

						<ButtonAuth value={'Sign In'} />
					</form>
					<Link
						to="/auth/reset-password"
						className="text-center mt-5 text-sm cursor-pointer block hover:tracking-wider transition-all hover:underline"
					>
						Forgot Password?
					</Link>
					<Divider />
					<div onClick={handleAuthGithub}>
						<ButtonSocial
							imgSrc={process.env.PUBLIC_URL + '/assets/github.svg'}
							title="github"
						/>
					</div>

					<Footer
						text={'Sign Up'}
						content={'Already have an account?'}
						path="/auth/signup"
					/>
				</div>
				<LoadingForm loading={loading} />
			</Container>
		</LayoutForm>
	);
}
