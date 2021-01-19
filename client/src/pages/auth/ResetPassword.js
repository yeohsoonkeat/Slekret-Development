import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import IconMail from '../../icons/icon_mail';
import IconLeft from '../../icons/ic_left';
import ButtonAuth from './components/ButtonAuth';
import Container from './components/Container';
import Input from './components/Input';
import InputPassword from './components/InputPassword';
import Title from './components/Title';
import LayoutForm from './Layout/LayoutForm';
import resetPasswordSchema from './schema/resetPaswordSchema';
import ErrorMessage from './components/ErrorMessage';
import ApiService from '../../service/api';
import AlertError from './components/AlertError';
import { useState } from 'react';
import LoadingForm from './components/LoadingForm';

const api = new ApiService();

export default function ResetPassword() {
	const history = useHistory();
	const location = useLocation();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(resetPasswordSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const res = await api
			.resetPassword('/auth/reset-password', data)
			.catch((err) => {
				return history.push('/error/500');
			});
		setLoading(false);
		if (res.data.emailSent) {
			history.push({
				pathname: '/auth/verify-email',
				state: {
					user: data,
					verifyPath: '/auth/verify-password',
					prevPath: location.pathname,
				},
			});
		} else {
			setMessage(res.data?.message);
		}
	};

	return (
		<LayoutForm>
			<AlertError message={message} />
			<Container>
				<div className="p-5">
					<Title value="Reset Password" />
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							name="email"
							placeholder="email"
							type="text"
							icon={IconMail}
							refForm={register}
						/>
						<ErrorMessage message={errors?.email?.message} />
						<InputPassword
							name="password"
							placeholder="password"
							refForm={register}
						/>
						<ErrorMessage message={errors?.password?.message} />

						<InputPassword
							name="confirm-password"
							placeholder="confirm password"
							refForm={register}
						/>
						<ErrorMessage message={errors['confirm-password']?.message} />

						<ButtonAuth value="submit" />
					</form>

					<Link
						to="/auth/login"
						className="mt-5 flex  justify-center hover:tracking-wide transition-all"
					>
						<IconLeft filled className="w-6 h-6" />
						<span>back to loign</span>
					</Link>
				</div>
				<LoadingForm loading={loading} />
			</Container>
		</LayoutForm>
	);
}
