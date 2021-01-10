import React from 'react';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const DefaultLayout = ({children}) => {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex flex-col">
        <NavigationBar/>
        {children}
      </div>
    
    <Footer/>
    </div>
  );
};

export default DefaultLayout;
