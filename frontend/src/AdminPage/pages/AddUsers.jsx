import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { addUserApi } from '../../util/api';

const AddUser = () => {

  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await addUserApi(user); 
      console.log("API Response:", response); 
  
      if (response?.success) {
        alert(response?.message || "User added successfully");
        setUser({
          username: '',
          email: '',
          password: '',
          role: '',
        });
        navigate("/admin/users");
      } else {
        alert(response?.message || "Failed to add user");
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unexpected error occurred";
      setMessage(errorMessage); 
    } finally {
      setLoading(false); 
    }
};

return (
  <div>
    <Typography variant="h4" gutterBottom>
      Add User
    </Typography>
    <Paper style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              autoComplete="new-email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={user.role}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {message && (
        <Typography color="textSecondary" style={{ marginTop: '10px' }}>
          {message}
        </Typography>
      )}
    </Paper>
  </div>
);
};

export default AddUser;
