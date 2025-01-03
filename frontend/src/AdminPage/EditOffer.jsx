import React from 'react';
import EditOffers from './pages/EditOffers';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css'; // Style tùy chỉnh

const AddUser = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <EditOffers />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
