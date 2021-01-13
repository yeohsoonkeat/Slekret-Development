import Footer from '../../../components/Footer';
import NavigationBar from '../../../components/NavigationBar';
import Features from '../components/features';
import Hero from '../components/hero';

export default function HomePage() {
	return (
		<>
			<NavigationBar />

			<Hero />
			<Features />
			<Footer />
		</>
	);
}
