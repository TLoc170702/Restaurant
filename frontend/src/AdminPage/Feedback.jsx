import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feedbacks from './pages/Feedbacks';
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
          <Feedbacks />
        </div>
      </div>
    </div>
  );
};

export default App;
