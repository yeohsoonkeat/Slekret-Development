const genrate_analytic_days = (numberOfDays) => {
	let listOfDays = [];
	const today = new Date();

	const year = today.getFullYear();
	const month = today.getMonth();
	const date = today.getDate();

	for (let i = 0; i < numberOfDays; i++) {
		const day = new Date(year, month, date - i);
		listOfDays = [day.toString().slice(4, 10), ...listOfDays];
	}
	return listOfDays;
};

export default genrate_analytic_days;
