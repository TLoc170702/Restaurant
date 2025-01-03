import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { addFeedbackApi } from '../../util/api';

const AddFeedback = () => {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    name: '',
    feedback: '',
    job: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + feedback.images.length > 1) {
      setError('You can upload a maximum of 1 images.');
      return;
    }

    setFeedback((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleImageDelete = (index) => {
    setFeedback((prevState) => {
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
    if (feedback.images.length === 0) {
      setError('Please upload at least one image.');
      setLoading(false);
      return;
    }
    if (feedback.images.length > 6) {
      setError('You can upload a maximum of 6 images.');
      setLoading(false);
      return;
    }

    // Chuẩn bị form data để gửi lên server
    const formData = new FormData();
    formData.append('name', feedback.name);
    formData.append('feedback', feedback.feedback);
    formData.append('job', feedback.job);


    // Append images
    feedback.images.forEach((file) => formData.append('images', file));

    try {
      const response = await addFeedbackApi(formData); // Gọi API
      if (!response.success) {
        alert('feedback added successfully!');
        // Reset form
        setFeedback({
          name: '',
          feedback: '',
          job: '',
          images: [],

        });
        navigate("/admin/feedback");
      } else {
        throw new Error(response.message || 'Failed to add feedback');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while adding the feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Add Feedback
      </Typography>
      <Paper style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                name="name"
                value={feedback.name}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item>
              <TextField
                label="Feedback"
                variant="outlined"
                fullWidth
                name="feedback"
                value={feedback.feedback}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Job"
                variant="outlined"
                fullWidth
                name="job"
                value={feedback.job}
                onChange={handleInputChange}
                required
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
                {feedback.images.map((file, index) => (
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
                {loading ? 'Adding...' : 'Add Feedback'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddFeedback;
