export default function RegisterLayout({ children }) {
	return (
		<>
			<div className="flex content-center items-center justify-center h-full">
				<div className="w-full lg:w-4/12 px-4">
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
