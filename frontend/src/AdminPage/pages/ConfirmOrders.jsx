import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getOrderByIdApi, confirmApi } from '../../util/api';


const EditConfirm = () => {

    const navigate = useNavigate();

    const { id } = useParams(); // Lấy id từ URL
    const [confirm, setConfirm] = useState({
        username: '',
        email: '',
        room: '',
        checkinDate: '',
        checkoutDate: '',
        children: '',
        adults: '',
        confirm: ''
    });

    useEffect(() => {
        fetchConfirmData();
    }, [id]);

    const fetchConfirmData = async () => {
        try {
            const confirmData = await getOrderByIdApi(id); // Gọi API lấy dữ liệu phòng

            if (confirmData && confirmData.confirm) {
                setConfirm({
                    username: confirmData.username || '',
                    email: confirmData.email || '',
                    room: confirmData.room || '',
                    checkinDate: confirmData.checkinDate || '',
                    checkoutDate: confirmData.checkoutDate || '',
                    children: confirmData.children || '',
                    adults: confirmData.adults || '',
                    confirm: confirmData.confirm || '',
                });
            } else {
                console.error('confirm data not found or invalid');
            }
        } catch (error) {
            console.error('Failed to fetch confirm data:', error);
        }
    };

    // Xử lý thay đổi trong các trường
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfirm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Gửi dữ liệu đã chỉnh sửa
    //     const handleSubmit = async (e) => {
    //         e.preventDefault();

    //         const formData = new FormData();

    //         formData.append('confirm', confirm.confirm);
    // console.log(formData)
    //         const updatedRoom = await confirmApi(id, formData);

    //         if (!updatedRoom) {
    //             alert('Room updated successfully');
    //             navigate("/admin/order");
    //         } else {
    //             alert('Failed to update room');
    //         }
    //     };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { confirm: confirm.confirm };
        try {
            const confirmOrder = await confirmApi(id, data); // Gửi dữ liệu dạng JSON

            if (!confirmOrder) {
                alert('Room updated successfully');
                navigate("/admin/order");
            } else {
                alert('Failed to update room');
            }
        } catch (error) {
            console.error('Error updating room:', error);
            alert('An error occurred while updating the room.');
        }
    };

    useEffect(() => {
        return () => { };
    }, []);


    return (
        <div>
            <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
                Confirm
            </Typography>
            <Paper style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} direction="column">
                        {/* username */}
                        <Grid item>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                name="username"
                                value={confirm.username}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* email */}
                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={confirm.email}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* room */}
                        <Grid item>
                            <TextField
                                label="Room"
                                variant="outlined"
                                fullWidth
                                name="room"
                                value={confirm.room}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* checkinDate */}
                        <Grid item>
                            <TextField
                                label="Check-in Date"
                                variant="outlined"
                                fullWidth
                                name="checkinDate"
                                value={confirm.checkinDate}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* checkoutDate */}
                        <Grid item>
                            <TextField
                                label="Check-out Date"
                                variant="outlined"
                                fullWidth
                                name="checkoutDate"
                                value={confirm.checkoutDate}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* adults */}
                        <Grid item>
                            <TextField
                                label="Adults"
                                variant="outlined"
                                fullWidth
                                name="adults"
                                value={confirm.adults}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* children */}
                        <Grid item>
                            <TextField
                                label="Children"
                                variant="outlined"
                                fullWidth
                                name="children"
                                value={confirm.children}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        {/* confirm */}
                        <Grid item>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="confirm-label">Confirm</InputLabel>
                                <Select
                                    labelId="confirm-label"
                                    value={confirm.confirm}
                                    onChange={handleInputChange}
                                    label="Confirm"
                                    name="confirm"
                                    required
                                >
                                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                                    <MenuItem value="Processing">Processing</MenuItem>
                                </Select>
                            </FormControl>
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

export default EditConfirm;
