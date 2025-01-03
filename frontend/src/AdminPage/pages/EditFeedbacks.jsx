import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { getFeedbackByIdApi, editFeedbackApi } from '../../util/api';

const EditFeedback = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Lấy id từ URL
  const [feedback, setFeedbackList] = useState({
    name: '',
    fedback: '',
    job: '',
    images: [], // Lưu trữ tệp và preview URL
  });

  useEffect(() => {
    fetchFeedbackData();
  }, [id]);

  const fetchFeedbackData = async () => {
    try {
      const feedbackData = await getFeedbackByIdApi(id); // Gọi API lấy dữ liệu phòng
      console.log('Data being sent to backend:', feedbackData);

      if (feedbackData && feedbackData.feedback) {
        setFeedbackList({
          name: feedbackData.name || '',
          feedback: feedbackData.feedback || '',
          job: feedbackData.job || '',
          images: feedbackData.images.map((imagePath) => ({
            file: null,
            preview: `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`, // Chuyển đổi đường dẫn
          })),
        });
      } else {
        console.error('Feedback data not found or invalid');
      }
    } catch (error) {
      console.error('Failed to fetch feedback data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + feedback.images.length > 1) {
      alert('You can upload a maximum of 1 images.');
      return;
    }

    const newImagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFeedbackList((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImagePreviews],
    }));
  };

  const handleRemoveImage = (index) => {
    setFeedbackList((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', feedback.name);
    formData.append('feedback', feedback.feedback);
    formData.append('job', feedback.job);

    // Duyệt qua các ảnh và thêm vào formData
    feedback.images.forEach((image) => {
      if (image.file) {  // Kiểm tra nếu là file hợp lệ
        formData.append('images', image.file);
      }
    });

    // Gửi danh sách các ảnh đã bị xóa
    const imagesToDelete = feedback.images.filter(image => image.deleted).map(image => image.preview);

    formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

    // Gửi formData lên API để cập nhật thông tin phòng
    const updatedFeedback = await editFeedbackApi(id, formData);

    if (!updatedFeedback) {
      alert('Feedback updated successfully');
      navigate("/admin/feedback");
    } else {
      alert('Failed to update feedback');
    }
  };

  useEffect(() => {
    return () => {
      feedback.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [feedback.images]);

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Edit Feedback
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

            {/* Display Selected Images */}
            <Grid item xs={12}>
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Selected Images:</Typography>
                <Grid container spacing={2}>
                  {feedback.images.map((image, index) => (
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

export default EditFeedback;
