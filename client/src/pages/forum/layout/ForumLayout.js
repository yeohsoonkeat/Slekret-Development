const ForumLayout = ({ children }) => {
	return (
		<div className="w-full max-w-8xl flex-1 px-2 sm:px-6 flex my-8">
			<main className="w-full">{children}</main>
		</div>
	);
};

export default ForumLayout;
