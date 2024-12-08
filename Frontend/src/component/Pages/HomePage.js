import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
        <div className="flex-1 p-6">
          <Home />
        </div>
        <Footer/>
    </div>
  );
}
