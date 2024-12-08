import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../Footer/Footer';
import AdsView from '../AdsView/AdsView';

export default function AdsViewPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
        <div className="flex-1 p-6">
          <AdsView />
        </div>
        <Footer/>
    </div>
  );
}
