import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import PostAd from '../PostAd/PostAd';

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <PostAd />
        </div>
      </div>
    </div>
  );
}
