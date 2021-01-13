// import { Link } from 'react-router-dom';

// export default function hero() {
// 	return (
// 		// <section className="container mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center relative z-0">
// 		// 	<div className="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left my-10">
// 		// 		<h1 className="uppercase text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2">
// 		// 			SLEKRET
// 		// 		</h1>
// 		// 		<h2 className="font-black tracking-wider text-5xl">
// 		// 			The platform for softeware engineer.
// 		// 		</h2>

// 		// 		<Link
// 		// 			to="/"
// 		// 			className="bg-purple-900 hover:bg-purple-400 py-3 px-6 uppercase text-lg font-bold text-white rounded-full"
// 		// 		>
// 		// 			Learn more
// 		// 		</Link>
// 		// 	</div>
// 		// 	<div className="hidden sm:flex items-center justify-center xl:justify-end w-1/2 xl:w-4/6 py-32">
// 		// 		<img
// 		// 			className="h-full w-2/3"
// 		// 			src="https://cdn.wallpapersafari.com/74/37/2KlvZP.jpg"
// 		// 			alt="k"
// 		// 		></img>
// 		// 	</div>
// 		</section>
// 	);
// }

import { Link as Scroll } from 'react-scroll';
export default function Hero() {
	return (
		<div className="bg-gray-100">
			<section className="h-screen w-full max-w-8xl mx-auto flex items-center justify-between">
				<div className="w-6/12">
					<h1 className="text-4xl font-black text-blue-500">Slekret</h1>

					<h1 className="text-6xl font-black tracking-normal mt-8">
						The platform for software engineer.
					</h1>
					<Scroll to="features" smooth={true}>
						<button className=" mt-10 bg-blue-500 text-white px-20 py-5 rounded uppercase font-semibold tracking-wide hover:shadow-lg transition-all focus:outline-none flex animate-float">
							Explore
							<svg
								className="ml-2 w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								></path>
							</svg>
						</button>
					</Scroll>
				</div>
				<div className="w-6/12">
					<img
						src={process.env.PUBLIC_URL + '/assets/landingpage.svg'}
						alt=""
						className="w-10/12 mx-auto"
					/>
				</div>
			</section>
		</div>
	);
}
