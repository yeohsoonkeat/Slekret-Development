import Footer from '../components/Footer';
import NavigationBar from '../components/navbar';

const DefaultLayout = ({ children }) => {
	return (
		<div className="bg-gray-100">
			<div className="min-h-screen flex flex-col items-center">
				<NavigationBar />
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
