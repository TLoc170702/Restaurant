import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { addOfferApi } from '../../util/api';

const AddOffer = () => {
  const navigate = useNavigate();

  const [offer, setOffer] = useState({
    offer: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Kiểm tra nếu số lượng ảnh vượt quá 6
    if (files.length + offer.images.length > 1) {
      setError('You can upload a maximum of 1 images.');
      return;
    }

    setOffer((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files], // Thêm ảnh mới vào danh sách ảnh đã có
    }));
  };

  const handleImageDelete = (index) => {
    setOffer((prevState) => {
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
    if (offer.images.length === 0) {
      setError('Please upload at least one image.');
      setLoading(false);
      return;
    }
    if (offer.images.length > 1) {
      setError('You can upload a maximum of 6 images.');
      setLoading(false);
      return;
    }

    // Chuẩn bị form data để gửi lên server
    const formData = new FormData();
    formData.append('offer', offer.offer);

    // Append images
    offer.images.forEach((file) => formData.append('images', file));

    try {
      const response = await addOfferApi(formData); // Gọi API
      if (!response.success) {
        alert('Offer added successfully!');
        // Reset form
        setOffer({
          offer: '',
          images: [],
        });
        navigate("/admin/offer");
      } else {
        throw new Error(response.message || 'Failed to add offer');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while adding the offer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Add Offer
      </Typography>
      <Paper style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            {/* Offer Name */}
            <Grid item>
              <TextField
                label="Offer Name"
                variant="outlined"
                fullWidth
                name="offer"
                value={offer.offer}
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
                {offer.images.map((file, index) => (
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
                {loading ? 'Adding...' : 'Add Offer'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddOffer;
