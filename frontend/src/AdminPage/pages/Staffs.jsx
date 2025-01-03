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
import { getStaffApi, deleteStaffApi } from '../../util/api';

const Staff = () => {

    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const res = await getStaffApi();
            if (res) {
                setStaffList(res);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDeleteStaff = async (id) => {
        if (window.confirm("Are you sure you want to delete this Staff?")) {
            try {
                const res = await deleteStaffApi(id);
                if (res.success) {
                    alert(res.message || "Staff deleted successfully");
                    fetchStaff();
                } else {
                    alert(res.message || "Failed to delete Staff");
                }
            } catch (error) {
                console.error("Error deleting Staff:", error);
                alert(error.message || "Failed to delete Staff");
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Staffs
            </Typography>

            {/* Nút Thêm Người Dùng */}
            <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
                <Link to="/admin/addstaff">
                    <Button variant="contained" color="primary">
                        Add Staff
                    </Button>
                </Link>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Staff Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffList.map((staff) => (
                            <TableRow key={staff._id}>
                                <TableCell>{staff.staff}</TableCell>
                                <TableCell>{staff.position}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/admin/editstaff/${staff._id}`}>
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
                                            onClick={() => handleDeleteStaff(staff._id)}
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

export default Staff;
