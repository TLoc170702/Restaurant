import React from 'react';
import Offers from './pages/Offers';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css'; // Style tùy chỉnh

const User = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Offers />
        </div>
      </div>
    </div>
  );
};

export default User;
