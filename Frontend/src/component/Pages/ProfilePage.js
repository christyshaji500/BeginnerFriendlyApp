import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Profile from '../Profile/Profile';

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Profile />
        </div>
      </div>
    </div>
  );
}
