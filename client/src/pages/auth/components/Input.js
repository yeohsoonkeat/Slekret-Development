export default function Input({
	icon: Icon,
	placeholder,
	type,
	name,
	refForm,
	isError,
}) {
	return (
		<div
			className={`ring-1 ring-opacity-40 ${
				isError ? 'ring-red-500' : 'ring-blue-500'
			}  rounded mt-5 flex items-center p-1 text-sm`}
		>
			<Icon
				filled
				className={`w-6 h-6 ${isError ? 'text-red-500' : 'text-blue-500'}`}
			/>
			<input
				name={name}
				type={type}
				className="w-full ml-2 p-2 focus:outline-none"
				placeholder={placeholder}
				autoComplete="true"
				ref={refForm}
			/>
		</div>
	);
}
