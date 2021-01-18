import { useState } from 'react';
import IconEyeOff from '../../../icons/ic_eye_off';
import IconPassword from '../../../icons/ic_password';
import IconEye from '../../../icons/ic_eye';

export default function InputPassword({ isError, name, placeholder, refForm }) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div
			className={`ring-1 ring-opacity-10 ${
				isError ? 'ring-red-500' : 'ring-blue-500'
			}  rounded mt-5 flex items-center p-1 text-sm`}
		>
			<IconPassword
				filled
				className={`w-6 h-6 ${isError ? 'text-red-500' : 'text-blue-500'}`}
			/>
			<input
				name={name}
				type={showPassword ? 'text' : 'password'}
				className="w-full ml-2 p-2 focus:outline-none"
				placeholder={placeholder}
				autoComplete="true"
				ref={refForm}
			/>
			<div onClick={() => setShowPassword(!showPassword)}>
				{showPassword ? (
					<IconEyeOff
						filled
						className={`w-6 h-6 cursor-pointer ${
							isError ? 'text-red-500' : 'text-blue-500'
						}`}
					/>
				) : (
					<IconEye
						filled
						className={`w-6 h-6 cursor-pointer ${
							isError ? 'text-red-500' : 'text-blue-500'
						}`}
					/>
				)}
			</div>
		</div>
	);
}
