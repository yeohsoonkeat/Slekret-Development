const analytic_line_config = (data, listOfDays) => {
	const { userData, threadData, postData, attachmentData } = data;
	const config = {
		type: 'line',
		data: {
			labels: listOfDays,
			datasets: [
				{
					label: 'Users',
					backgroundColor: '#EC4899',
					borderColor: '#EC4899',
					data: userData,
					fill: false,
				},
				{
					label: 'Threads',
					backgroundColor: '#1D4ED8',
					borderColor: '#60A5FA',
					data: threadData,
					fill: false,
				},
				{
					label: 'Posts',
					backgroundColor: '#fff',
					borderColor: '#fff',
					data: postData,
					fill: false,
				},
				{
					label: 'attachment',
					backgroundColor: '#D97706',
					borderColor: '#D97706',
					data: attachmentData,
					fill: false,
				},
			],
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			title: {
				display: false,
				text: 'Sales Charts',
				fontColor: 'white',
			},
			legend: {
				labels: {
					fontColor: 'white',
				},
				align: 'end',
				position: 'bottom',
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true,
			},
			scales: {
				xAxes: [
					{
						ticks: {
							fontColor: 'rgba(255,255,255,.7)',
							callback: function (tick, index, array) {
								const value = skipDays(array.length);
								return index % value ? '' : tick;
							},
						},
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Month',
							fontColor: 'white',
						},
						gridLines: {
							display: false,
							borderDash: [1],
							borderDashOffset: [1],
							color: 'rgba(0, 0,0, 0.3)',
							zeroLineColor: 'rgba(0, 0, 0, 0)',
							zeroLineBorderDash: [2],
							zeroLineBorderDashOffset: [2],
						},
					},
				],
				yAxes: [
					{
						ticks: {
							fontColor: 'rgba(255,255,255,.7)',
						},
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Value',
							fontColor: 'white',
						},
						gridLines: {
							borderDash: [3],
							borderDashOffset: [3],
							drawBorder: false,
							color: 'rgba(255, 255, 255, 0.15)',
							zeroLineColor: 'rgba(0, 37, 41, 0)',
							zeroLineBorderDash: [2],
							zeroLineBorderDashOffset: [2],
						},
					},
				],
			},
		},
	};
	return config;
};

const skipDays = (days) => {
	if (days === 7) {
		return 1;
	} else if (days === 30) {
		return 3;
	} else if (days === 90) {
		return 7;
	} else {
		return 20;
	}
};

export default analytic_line_config;
