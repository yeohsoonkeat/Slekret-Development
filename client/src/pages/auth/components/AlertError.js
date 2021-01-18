export default function AlertError({ message }) {
	if (message) {
		return (
			<div
				className="w-96 mb-5 relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
				role="alert"
			>
				<p>{message}</p>
			</div>
		);
	}
	return <></>;
}
