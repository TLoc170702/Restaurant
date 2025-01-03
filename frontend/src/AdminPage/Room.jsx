import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomsAdmin from './pages/Rooms';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css'; // Style tùy chỉnh

const Room = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <RoomsAdmin />
        </div>
      </div>
    </div>
  );
};

export default Room;
