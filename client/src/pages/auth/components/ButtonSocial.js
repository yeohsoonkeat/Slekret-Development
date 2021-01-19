export default function ButtonSocial({ imgSrc, title }) {
	return (
		<button
			className="w-full mt-5 p-2 rounded font-semibold uppercase hover:tracking-wider transition-all hover:shadow-inner focus:outline-none text-sm flex justify-center items-center"
			style={{
				backgroundColor: '#F2F6FF',
			}}
		>
			<img className=" w-7 h-7 mr-2" src={imgSrc} alt="" /> {title}
		</button>
	);
}
