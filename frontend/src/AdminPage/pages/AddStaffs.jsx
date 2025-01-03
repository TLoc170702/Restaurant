import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { addStaffApi } from '../../util/api';


const AddStaff = () => {

  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    staff: '',
    position: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Kiểm tra nếu số lượng ảnh vượt quá 1
    if (files.length + staff.images.length > 1) {
      setError('You can upload a maximum of 1 images.');
      return;
    }

    setStaff((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files], // Thêm ảnh mới vào danh sách ảnh đã có
    }));
  };

  const handleImageDelete = (index) => {
    setStaff((prevState) => {
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
    if (staff.images.length === 0) {
      setError('Please upload at least one image.');
      setLoading(false);
      return;
    }
    if (staff.images.length > 1) {
      setError('You can upload a maximum of 1 images.');
      setLoading(false);
      return;
    }

    // Chuẩn bị form data để gửi lên server
    const formData = new FormData();
    formData.append('staff', staff.staff);
    formData.append('position', staff.position);

    // Append images
    staff.images.forEach((file) => formData.append('images', file));

    try {
      const response = await addStaffApi(formData); // Gọi API
      if (!response.success) {
        alert('staff added successfully!');
        // Reset form
        setStaff({
          staff: '',
          position: '',
          images: [],

        });
        navigate("/admin/staff");
      } else {
        throw new Error(response.message || 'Failed to add staff');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while adding the staff.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Add Staff
      </Typography>
      <Paper style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                label="Staff Name"
                variant="outlined"
                fullWidth
                name="staff"
                value={staff.staff}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Price */}
            <Grid item>
              <TextField
                label="Position"
                variant="outlined"
                fullWidth
                name="position"
                value={staff.position}
                onChange={handleInputChange}
                required
                type="text"
              />
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
                {staff.images.map((file, index) => (
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
                {loading ? 'Adding...' : 'Add Staff'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddStaff;
