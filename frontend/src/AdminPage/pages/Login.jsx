import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled container
const LoginContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f6f8',
});

const LoginForm = styled(Paper)({
  padding: '16px', // Thay theme.spacing(4) bằng giá trị cụ thể
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Thay theme.shadows[3] bằng giá trị cụ thể
});


const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <LoginContainer>
      <LoginForm elevation={3}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <TextField
              label="Username"
              variant="outlined"
              autoComplete="new-email"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          <Box marginBottom={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="new-password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default AdminLogin;
