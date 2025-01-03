import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { getStaffByIdApi, editStaffApi } from '../../util/api';

const EditStaff = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Lấy id từ URL
  // Khởi tạo trạng thái với dữ liệu phòng hiện có
  const [staff, setStaff] = useState({
    staff: '',
    position: '',
    images: [],
  });

  // Sử dụng dữ liệu hiện có để khởi tạo trạng thái khi component được render
  useEffect(() => {
    fetchStaffData();
  }, [id]);

  const fetchStaffData = async () => {
    try {
      const staffData = await getStaffByIdApi(id); // Gọi API lấy dữ liệu phòng

      if (staffData && staffData.staff) {
        setStaff({
          staff: staffData.staff || '',
          position: staffData.position || '',

          images: staffData.images.map((imagePath) => ({
            file: null,
            preview: `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`, // Chuyển đổi đường dẫn
          })),
        });
      } else {
        console.error('Staff data not found or invalid');
      }
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + staff.images.length > 1) {
      alert('You can upload a maximum of 1 images.');
      return;
    }

    const newImagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setStaff((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImagePreviews],
    }));
  };

  const handleRemoveImage = (index) => {
    setStaff((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData để gửi cả thông tin phòng và ảnh
    const formData = new FormData();

    formData.append('staff', staff.staff);
    formData.append('position', staff.position);


    // Duyệt qua các ảnh và thêm vào formData
    staff.images.forEach((image) => {
      if (image.file) {  // Kiểm tra nếu là file hợp lệ
        formData.append('images', image.file);
      }
    });

    // Gửi danh sách các ảnh đã bị xóa
    const imagesToDelete = staff.images.filter(image => image.deleted).map(image => image.preview);

    formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

    // Gửi formData lên API để cập nhật thông tin phòng
    const updatedStaff = await editStaffApi(id, formData);

    if (!updatedStaff) {
      alert('staff updated successfully');
      navigate("/admin/staff");
    } else {
      alert('Failed to update staff');
    }
  };

  useEffect(() => {
    // Clean up to revoke the object URLs for images when component unmounts
    return () => {
      staff.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [staff.images]);

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
        Edit Staff
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
                  {staff.images.map((image, index) => (
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

export default EditStaff;
