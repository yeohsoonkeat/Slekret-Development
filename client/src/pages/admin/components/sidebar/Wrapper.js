const Wrapper = ({ children }) => {
	return (
		<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap  justify-between relative md:w-64 z-10 py-4 px-6 text-xl flex-col ">
			{children}
		</nav>
	);
};

export default Wrapper;
