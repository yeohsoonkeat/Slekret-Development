import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import changePassword from '../schema/changePassword';

export default function ProfileSettingChangePassword() {
	const { errors, register, handleSubmit } = useForm({
		resolver: yupResolver(changePassword),
	});
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className="flex-1 w-full p-5">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">Old Password</label>
					<input
						className=" mt-2 border outline-none w-full mx-auto p-3 rounded"
						name="old-password"
						ref={register}
						type="password"
					/>
					<p className="text-red-400">{errors['old-password']?.message}</p>
				</div>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">New Password</label>
					<input
						className=" mt-2 border outline-none w-full mx-auto p-3 rounded"
						name="new-password"
						ref={register}
						type="password"
					/>
					<p className="text-red-400">{errors['new-password']?.message}</p>
				</div>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">Confirm Password</label>
					<input
						className=" mt-2 border outline-none w-full mx-auto p-3 rounded"
						name="confirm-password"
						ref={register}
						type="password"
					/>
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
	);
}
