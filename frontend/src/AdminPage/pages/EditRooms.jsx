import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { getRoomByIdApi, editRoomApi } from '../../util/api';

const EditRoom = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Lấy id từ URL
  const [room, setRoom] = useState({
    room: '',
    description: '',
    price: '',
    bed: '',
    guest: '',
    images: [], // Lưu trữ tệp và preview URL
  });

  useEffect(() => {
    fetchRoomData();
  }, [id]);

  const fetchRoomData = async () => {
    try {
      const roomData = await getRoomByIdApi(id); // Gọi API lấy dữ liệu phòng

      if (roomData && roomData.room) {
        setRoom({
          room: roomData.room || '',
          description: roomData.description || '',
          price: roomData.price || '',
          bed: roomData.bed || '',
          guest: roomData.guest || '',
          images: roomData.images.map((imagePath) => ({
            file: null,
            preview: `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`, // Chuyển đổi đường dẫn
          })),
        });
      } else {
        console.error('Room data not found or invalid');
      }
    } catch (error) {
      console.error('Failed to fetch room data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + room.images.length > 6) {
      alert('You can upload a maximum of 6 images.');
      return;
    }

    const newImagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setRoom((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImagePreviews],
    }));
  };

  const handleRemoveImage = (index) => {
    setRoom((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData để gửi cả thông tin phòng và ảnh
    const formData = new FormData();

    formData.append('room', room.room);
    formData.append('description', room.description);
    formData.append('price', room.price);
    formData.append('bed', room.bed);
    formData.append('guest', room.guest);

    // Duyệt qua các ảnh và thêm vào formData
    room.images.forEach((image) => {
      if (image.file) {  // Kiểm tra nếu là file hợp lệ
        formData.append('images', image.file);
      }
    });

    // Gửi danh sách các ảnh đã bị xóa
    const imagesToDelete = room.images.filter(image => image.deleted).map(image => image.preview);

    formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

    // Gửi formData lên API để cập nhật thông tin phòng
    const updatedRoom = await editRoomApi(id, formData);

    if (!updatedRoom) {
      alert('Room updated successfully');
      navigate("/admin/rooms");
    } else {
      alert('Failed to update room');
    }
  };

  useEffect(() => {
    // Clean up to revoke the object URLs for images when component unmounts
    return () => {
      room.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [room.images]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Room
      </Typography>
      <Paper style={{ padding: '20px', borderRadius: '10px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Room Name"
                variant="outlined"
                fullWidth
                name="room"
                value={room.room}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                value={room.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                name="price"
                value={room.price}
                onChange={handleInputChange}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bed"
                variant="outlined"
                fullWidth
                name="bed"
                value={room.bed}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Guest"
                variant="outlined"
                fullWidth
                name="guest"
                value={room.guest}
                onChange={handleInputChange}
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
                  {room.images.map((image, index) => (
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

export default EditRoom;
