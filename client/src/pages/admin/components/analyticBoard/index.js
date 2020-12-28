import React, { useState } from 'react';
import DropDown from '../dropDown';
import AnalyticCardStat from './analyticCardStat';
import AnaylticChartLine from './analyticChartLine';

export default function AnalyticBoard() {
	const [days, setDays] = useState(7);
	const data = {
		userData: randomArray(days),
		threadData: randomArray(days),
		postData: randomArray(days),
		attachmentData: randomArray(days),
	};
	return (
		<div className="p-2 md:m-10 relative flex flex-col min-w-0 break-words w-12/12 mb-6 shadow-lg rounded bg-gray-800">
			<div className="flex flex-wrap items-center">
				<div className="relative w-full max-w-full flex-grow flex-1">
					<h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
						Overview
					</h6>
					<DropDown previewDate={days} setPreviewDate={setDays} />

					<div className="flex flex-wrap justify-between mt-10">
						{' '}
						<AnalyticCardStat
							bgColor="bg-blue-400"
							title="Threads"
							value={data.threadData.reduce((a, b) => a + b)}
						/>
						<AnalyticCardStat
							bgColor="bg-blue-400"
							title="Posts"
							value={data.postData.reduce((a, b) => a + b)}
						/>
						<AnalyticCardStat
							bgColor="bg-pink-500"
							title="Users"
							value={data.userData.reduce((a, b) => a + b)}
						/>
						<AnalyticCardStat
							bgColor="bg-yellow-600"
							title="Attachment"
							value={data.attachmentData.reduce((a, b) => a + b)}
						/>
					</div>
				</div>
			</div>
			<AnaylticChartLine days={days} data={data} />
		</div>
	);
}

// will for demo

const randomArray = (days) => {
	let arr = [];
	for (let i = 0; i < days; i++) {
		arr.push(Math.floor(Math.random() * 50) + 1);
	}
	return arr;
};
