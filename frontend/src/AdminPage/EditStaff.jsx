import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditStaffs from './pages/EditStaffs';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css'; // Style tùy chỉnh

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <EditStaffs />
        </div>
      </div>
    </div>
  );
};

export default App;
