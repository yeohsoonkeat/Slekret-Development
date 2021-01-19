import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AlertError from './components/AlertError';
import ButtonAuth from './components/ButtonAuth';
import Container from './components/Container';
import ErrorMessage from './components/ErrorMessage';
import Input from './components/Input';
import LoadingForm from './components/LoadingForm';
import Title from './components/Title';
import constant from './constant/form';
import LayoutForm from './Layout/LayoutForm';
import ApiService from '../../service/api';
import { useHistory } from 'react-router-dom';

const api = new ApiService();

export default function SetUpUsername() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const { register, errors, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		setLoading(true);
		const res = await api
			.setUpUsername('/auth/setup-username', data)
			.catch((er) => {
				history.push('/error/500');
			});
		if (!res?.data?.auth) {
			setLoading(false);
			setMessage(res.data.message);
		} else {
			window.open('/', '_self');
			setLoading(false);
			window.localStorage.setItem('auth', 'true');
		}
	};

	return (
		<LayoutForm>
			<AlertError message={message} />
			<Container>
				<div className="p-5">
					<Title value={'Set up username'} />
					<form onSubmit={handleSubmit(onSubmit)}>
						{constant.usernameForm.map((input, index) => {
							return (
								<div key={index}>
									<Input
										type={input.name}
										placeholder={input.placeholder}
										name={input.name}
										icon={input.icon}
										refForm={register}
										isError={errors[input.name]?.message}
									/>
									<ErrorMessage message={errors[input.name]?.message} />
								</div>
							);
						})}

						<ButtonAuth value={'Submit'} />
					</form>
				</div>
				<LoadingForm loading={loading} />
			</Container>
		</LayoutForm>
	);
}
