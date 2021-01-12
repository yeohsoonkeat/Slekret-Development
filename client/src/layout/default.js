import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const DefaultLayout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex flex-col items-center">
        <NavigationBar />
        <div className="w-full max-w-8xl flex-1 flex flex-col">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
