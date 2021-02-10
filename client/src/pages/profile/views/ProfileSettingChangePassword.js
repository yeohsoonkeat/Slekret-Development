import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthProvider from '../../../hook/useAuthProvider';
import IconEye from '../../../icons/ic_eye';
import IconEyeOff from '../../../icons/ic_eye_off';
import ApiService from '../../../service/api';
import ProfileSettingLayout from '../layout/ProfileSettingLayout';
import changePassword from '../schema/changePassword';

const api = new ApiService();
export default function ProfileSettingChangePassword() {
	const [authState] = useAuthProvider();
	const [showPassword, setShowPassword] = useState(false);
	const { errors, register, handleSubmit, reset } = useForm({
		resolver: yupResolver(changePassword),
	});
	const [response, setResponse] = useState('');

	const onSubmit = async (data) => {
		const res = await api.changePassword('/auth/change-password', {
			password: data.password,
			username: authState.user.username,
		});
		if (res.data.code === 200) {
			reset();
		}
		setResponse(res.data);
	};
	return (
		<ProfileSettingLayout>

		<div className="flex-1 w-full p-5">
			{response && (
				<div
					className={`w-full mb-5 relative py-3 pl-4 pr-10 leading-normal ${
						response.code !== 200 ? 'bg-red-100' : 'bg-green-100'
					} rounded-lg`}
					role="alert"
				>
					<p>{response.message}</p>
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">New Password</label>
					<div className="flex items-center bg-white mt-2">
						<input
							className="outline-none w-full mx-auto p-3 rounded"
							name="password"
							ref={register}
							type={`${showPassword ? 'text' : 'password'}`}
						/>
						{!showPassword ? (
							<div
								className="cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								<IconEye className="w-6 h-6" />
							</div>
						) : (
							<div
								className="cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								<IconEyeOff className="w-6 h-6" />
							</div>
						)}
					</div>

					<p className="text-red-400">{errors['password']?.message}</p>
				</div>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">Confirm Password</label>
					<div className="flex items-center bg-white mt-2">
						<input
							className="outline-none w-full mx-auto p-3 rounded"
							name="confirm-password"
							ref={register}
							type={`${showPassword ? 'text' : 'password'}`}
						/>
						{!showPassword ? (
							<div
								className="cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								<IconEye className="w-6 h-6" />
							</div>
						) : (
							<div
								className="cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								<IconEyeOff className="w-6 h-6" />
							</div>
						)}
					</div>
					<p className="text-red-400">{errors['confirm-password']?.message}</p>
				</div>
				<button
					className="bg-blue-500 mt-9 text-white hover:tracking-wide transition-all w-full p-3 rounded"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
		</ProfileSettingLayout>

	);
}
