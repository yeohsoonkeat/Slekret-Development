import React from 'react';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const DefaultLayout = (props) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-1 max-w-8xl px-4 mx-auto">{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
