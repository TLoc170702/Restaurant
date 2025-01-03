import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { getOfferByIdApi, editOfferApi } from '../../util/api';


const EditOffer = () => {

  const navigate = useNavigate();

  const { id } = useParams(); // Lấy id từ URL
  const [offer, setOffer] = useState({
    offer: '',
    images: [],
  });

  useEffect(() => {
    fetchOfferData();
  }, [id]);

  const fetchOfferData = async () => {
    try {
      const offerData = await getOfferByIdApi(id); // Gọi API lấy dữ liệu phòng

      if (offerData && offerData.offer) {
        setOffer({
          offer: offerData.offer || '',
          images: offerData.images.map((imagePath) => ({
            file: null,
            preview: `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`,
          })),
        });
      } else {
        console.error('Offer data not found or invalid');
      }
    } catch (error) {
      console.error('Failed to fetch offer data:', error);
    }
  };


  // Xử lý thay đổi trong các trường
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý khi người dùng tải ảnh mới lên
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + offer.images.length > 1) {
      alert('You can upload a maximum of 1 images.');
      return;
    }

    const newImagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setOffer((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImagePreviews],
    }));
  };

  const handleRemoveImage = (index) => {
    setOffer((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  // Gửi dữ liệu đã chỉnh sửa
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData để gửi cả thông tin phòng và ảnh
    const formData = new FormData();

    formData.append('offer', offer.offer);

    // Duyệt qua các ảnh và thêm vào formData
    offer.images.forEach((image) => {
      if (image.file) {  // Kiểm tra nếu là file hợp lệ
        formData.append('images', image.file);
      }
    });

    // Gửi danh sách các ảnh đã bị xóa
    const imagesToDelete = offer.images.filter(image => image.deleted).map(image => image.preview);

    formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

    // Gửi formData lên API để cập nhật thông tin phòng
    const updatedOffer = await editOfferApi(id, formData);

    if (!updatedOffer) {
      alert('Offer updated successfully');
      navigate("/admin/offer");
    } else {
      alert('Failed to update offer');
    }
  };


  useEffect(() => {
    // Clean up to revoke the object URLs for images when component unmounts
    return () => {
      offer.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [offer.images]);



  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Edit Offer
      </Typography>
      <Paper style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            {/* offer Name */}
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

            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Selected Images:</Typography>
                <Grid container spacing={2}>
                  {offer.images.map((image, index) => (
                    <Grid item key={index}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img
                          src={image.preview}
                          alt={`selected-${index}`}
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
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
              </div>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default EditOffer;
