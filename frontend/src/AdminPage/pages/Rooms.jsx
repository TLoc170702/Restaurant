import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { getRoomApi, deleteRoomApi } from '../../util/api';

const Rooms = () => {

    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRoom();
    }, []);

    const fetchRoom = async () => {
        try {
            const res = await getRoomApi();
            if (res) {
                setRoomList(res);
            }
        } catch (error) {
            console.error('Failed to fetch room:', error);
        }
        finally {
            setLoading(false);
        }
    };


    const handleDeleteRoom = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                const res = await deleteRoomApi(id);
                if (res.success) {
                    alert(res.message || "Room deleted successfully");
                    fetchRoom(); // Cập nhật danh sách người dùng
                } else {
                    alert(res.message || "Failed to delete room");
                }
            } catch (error) {
                console.error("Error deleting room:", error);
                alert(error.message || "Failed to delete room");
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Rooms
            </Typography>

            {/* Nút Thêm Người Dùng */}
            <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
                <Link to="/admin/addroom">
                    <Button variant="contained" color="primary">
                        Add Room
                    </Button>
                </Link>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>RoomName</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Bed</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roomList.map((room) => (
                            <TableRow key={room._id}>
                                <TableCell>{room.room}</TableCell>
                                <TableCell>{room.price}</TableCell>
                                <TableCell>{room.bed}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/admin/editroom/${room._id}`}>
                                            <EditIcon
                                                style={{
                                                    color: 'blue',
                                                    fontSize: '24px',
                                                    cursor: 'pointer',
                                                    marginRight: '10px'
                                                }}
                                            />
                                        </Link>
                                        <DeleteIcon
                                            style={{
                                                color: 'red',
                                                fontSize: '24px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleDeleteRoom(room._id)}
                                        />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Rooms;
