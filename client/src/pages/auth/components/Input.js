export default function Input({ icon: Icon, placeholder, type, name }) {
	return (
		<div className="ring-1 ring-opacity-10 ring-blue-500  rounded mt-5 flex items-center p-1 text-sm">
			<Icon filled className="w-6 h-6 text-blue-500" />
			<input
				name={name}
				type={type}
				className="w-full ml-2 p-2 focus:outline-none"
				placeholder={placeholder}
				autoComplete="true"
			/>
		</div>
	);
}
