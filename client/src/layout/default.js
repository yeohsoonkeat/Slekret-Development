import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const DefaultLayout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex flex-col items-center">
        <NavigationBar />

        <div className="px-2 sm:px-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
