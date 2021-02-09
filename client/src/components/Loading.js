const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
		  	<img
				src={process.env.PUBLIC_URL + "/assets/Portal.png"}
				alt=""
				className="animate-pulse mx-auto"
			/>
		</div>
    )
}

export default Loading