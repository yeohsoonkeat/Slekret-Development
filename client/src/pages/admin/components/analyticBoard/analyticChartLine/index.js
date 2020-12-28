import { useEffect } from 'react';
import Chart from 'chart.js';
import genrate_analytic_days from '../../../utils/generate_analytic_days';
import analytic_line_config from '../../../utils/analytic_line.config';

export default function AnaylticChartLine({ days, data }) {
	const listOfDays = genrate_analytic_days(days);

	useEffect(() => {
		if (window.myLine !== undefined) window.myLine.destroy();
		var ctx = document.getElementById('line-chart').getContext('2d');
		const config = analytic_line_config(data, listOfDays);
		window.myLine = new Chart(ctx, config);
	});
	return (
		<div className="p-4 flex-auto">
			<div className="relative h-96">
				<canvas id="line-chart"></canvas>
			</div>
		</div>
	);
}
