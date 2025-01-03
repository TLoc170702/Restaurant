import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditRooms from './pages/EditRooms';
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
          <EditRooms />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
