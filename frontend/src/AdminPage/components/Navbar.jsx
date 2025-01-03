import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {/* Admin Dropdown */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            marginRight: '100px' 
          }} 
          onClick={handleMenuOpen}
        >
          <Typography variant="body1" style={{ marginRight: '5px' }}>
            Admin
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ArrowDropDownIcon style={{ fontSize: '1.5rem' }} />
          </div>
        </div>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          keepMounted
        >
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
