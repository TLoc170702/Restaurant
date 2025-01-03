import React from 'react';
import AddStaffs from './pages/AddStaffs';
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
          <AddStaffs />
        </div>
      </div>
    </div>
  );
};

export default User;
