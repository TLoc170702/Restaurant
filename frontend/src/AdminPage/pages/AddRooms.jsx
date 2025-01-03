import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { addRoomApi } from '../../util/api';

const AddRoom = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    room: '',
    description: '',
    price: '',
    images: [],
    bed: '',
    guest: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Kiểm tra nếu số lượng ảnh vượt quá 6
    if (files.length + room.images.length > 6) {
      setError('You can upload a maximum of 6 images.');
      return;
    }

    setRoom((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files], // Thêm ảnh mới vào danh sách ảnh đã có
    }));
  };

  const handleImageDelete = (index) => {
    setRoom((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1); // Xóa ảnh tại vị trí index
      return { ...prevState, images: newImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Kiểm tra số lượng ảnh trước khi gửi form
    if (room.images.length === 0) {
      setError('Please upload at least one image.');
      setLoading(false);
      return;
    }
    if (room.images.length > 6) {
      setError('You can upload a maximum of 6 images.');
      setLoading(false);
      return;
    }

    // Chuẩn bị form data để gửi lên server
    const formData = new FormData();
    formData.append('room', room.room);
    formData.append('description', room.description);
    formData.append('price', room.price);
    formData.append('bed', room.bed);
    formData.append('guest', room.guest);

    // Append images
    room.images.forEach((file) => formData.append('images', file));

    try {
      const response = await addRoomApi(formData); // Gọi API
      if (!response.success) {
        alert('Room added successfully!');
        // Reset form
        setRoom({
          room: '',
          description: '',
          price: '',
          images: [],
          bed: '',
          guest: '',
        });
        navigate("/admin/rooms");
      } else {
        throw new Error(response.message || 'Failed to add room');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while adding the room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Add Room
      </Typography>
      <Paper style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            {/* Room Name */}
            <Grid item>
              <TextField
                label="Room Name"
                variant="outlined"
                fullWidth
                name="room"
                value={room.room}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Description */}
            <Grid item>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                value={room.description}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
              />
            </Grid>

            {/* Price */}
            <Grid item>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                name="price"
                value={room.price}
                onChange={handleInputChange}
                required
                type="number"
              />
            </Grid>

            {/* Bed Selection */}
            <Grid item>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="bed-label">Bed</InputLabel>
                <Select
                  labelId="bed-label"
                  value={room.bed}
                  onChange={handleInputChange}
                  label="Bed"
                  name="bed"
                  required
                >
                  <MenuItem value="Single Bed">Single Bed</MenuItem>
                  <MenuItem value="Double Bed">Double Bed</MenuItem>
                  <MenuItem value="Queen Bed">Queen Bed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Guest Selection */}
            <Grid item>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="guest-label">Guest</InputLabel>
                <Select
                  labelId="guest-label"
                  value={room.guest}
                  onChange={handleInputChange}
                  label="Guest"
                  name="guest"
                  required
                >
                  <MenuItem value="2 Guest">2 Guest</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Image Upload */}
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                Upload Images
              </Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Grid>

            {/* Show selected images with delete option */}
            <Grid item>
              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {room.images.map((file, index) => (
                  <Grid item key={index}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={URL.createObjectURL(file)} // Hiển thị ảnh dưới dạng thumbnail
                        alt={`Preview ${index}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        X
                      </button>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Feedback */}
            {error && (
              <Grid item>
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
            {success && (
              <Grid item>
                <Typography variant="body1" color="primary">
                  {success}
                </Typography>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Room'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddRoom;
