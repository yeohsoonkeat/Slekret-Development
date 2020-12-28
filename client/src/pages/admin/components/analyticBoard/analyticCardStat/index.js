const AnalyticCardStat = ({ bgColor, title, value }) => {
	return (
		<div
			className={` ${bgColor} m-2 w-5/12 md:w-3/12 lg:w-2/12  text-white h-20 rounded-md flex justify-center items-center flex-col`}
		>
			<h2 className="text-xl">{title}</h2>
			<h1 className="text-2xl">+{value}</h1>
		</div>
	);
};

export default AnalyticCardStat;
