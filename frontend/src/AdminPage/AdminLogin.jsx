import React from 'react';
import AdminLogin from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css'; // Style tùy chỉnh

const AddUser = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="content">
          <AdminLogin />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
