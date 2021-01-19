export default function Wrapper({ children }) {
	return (
		<div className="max-w-8xl mx-auto px-6 py-5  flex items-center justify-between">
			{children}
		</div>
	);
}
