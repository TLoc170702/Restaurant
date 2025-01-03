import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin" className="list-item">Dashboard</Link>
      <Link to="/admin/order" className="list-item">Order</Link>
      <Link to="/admin/users" className="list-item">Users</Link>
      <Link to="/admin/rooms" className="list-item">Rooms</Link>
      
      <Link to="/admin/offer" className="list-item">Offer</Link>
      <Link to="/admin/staff" className="list-item">Staff Member</Link>
      <Link to="/admin/feedback" className="list-item">Feedback</Link>
      <Link to="/admin/settings" className="list-item">Settings</Link>

    </div>
  );
};

export default Sidebar;
