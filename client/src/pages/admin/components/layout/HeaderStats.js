import React from 'react'

export default function HeaderStats() {
	return (
		<div className="relative bg-gray-900 md:pt-20 pb-20 pt-10">
			<div className="px-4 md:px-10 mx-auto w-full ">
				<div className="flex flex-wrap">
					<Card
						subTitle="Totoal Users"
						title={5000}
						awesomeIcon="fas fa-users"
						iconColor="bg-pink-500"
					/>
					<Card
						subTitle="Totoal Threads"
						title={1000}
						awesomeIcon="fas fa-comment"
						iconColor="bg-blue-400"
					/>
					<Card
						subTitle="Totoal Posts"
						title={1000}
						awesomeIcon="fas fa-users"
						iconColor="bg-blue-400"
					/>
					<Card
						subTitle="Totoal Attachments"
						title={1000}
						awesomeIcon="fas fa-file-alt"
						iconColor="bg-yellow-600"
					/>
				</div>
			</div>
		</div>
	)
}

const Card = ({ subTitle, title, iconColor, awesomeIcon }) => {
	return (
		<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
				<div className="flex-auto p-4">
					<div className="flex flex-wrap">
						<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
							<h5 className="text-gray-500 uppercase font-bold text-xs">
								{subTitle}
							</h5>
							<span className="font-semibold text-2xl text-gray-800">
								{title}
							</span>
						</div>
						<div className="relative w-auto pl-4 flex-initial">
							<div
								className={
									'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
									iconColor
								}
							>
								<i className={awesomeIcon}></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
