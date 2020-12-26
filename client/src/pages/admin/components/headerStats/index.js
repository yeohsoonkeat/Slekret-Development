import React from 'react';
import CardStat from './CardStat';
import Wrapper from './Wrapper';

export default function HeaderStats() {
	return (
		<Wrapper>
			<CardStat
				subTitle="Totoal Users"
				title={5000}
				awesomeIcon="fas fa-users"
				iconColor="bg-pink-500"
			/>
			<CardStat
				subTitle="Totoal Threads"
				title={1000}
				awesomeIcon="fas fa-comment"
				iconColor="bg-blue-400"
			/>
			<CardStat
				subTitle="Totoal Posts"
				title={1000}
				awesomeIcon="fas fa-users"
				iconColor="bg-blue-400"
			/>
			<CardStat
				subTitle="Totoal Attachments"
				title={1000}
				awesomeIcon="fas fa-file-alt"
				iconColor="bg-yellow-600"
			/>
		</Wrapper>
	);
}
