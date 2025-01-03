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
import { getUserApi, deleteUserApi } from '../../util/api';

const Users = () => {

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await getUserApi();
            if (res) {
                setUserList(res);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
        finally {
            setLoading(false);
        }
    };


    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const res = await deleteUserApi(id);
                if (res.success) {
                    alert(res.message || "User deleted successfully");
                    fetchUser(); // Cập nhật danh sách người dùng
                } else {
                    alert(res.message || "Failed to delete user");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert(error.message || "Failed to delete user");
            }
        }
    };


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>

            {/* Nút Thêm Người Dùng */}
            <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
                <Link to="/admin/adduser">
                    <Button variant="contained" color="primary">
                        Add User
                    </Button>
                </Link>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <DeleteIcon
                                            style={{
                                                color: 'red',
                                                fontSize: '24px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleDeleteUser(user._id)}
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

export default Users;
