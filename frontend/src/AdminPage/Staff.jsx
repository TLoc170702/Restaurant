import React from 'react';
import Staffs from './pages/Staffs';
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
          <Staffs />
        </div>
      </div>
    </div>
  );
};

export default User;
