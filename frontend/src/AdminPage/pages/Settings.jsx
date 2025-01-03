import React from 'react';
import { Typography, Button } from '@mui/material';

const Settings = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography>Manage your application settings here.</Typography>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Save Changes
      </Button>
    </div>
  );
};

export default Settings;
