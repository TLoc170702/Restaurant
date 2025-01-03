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
import { getFeedbackApi, deleteFeedbackApi } from '../../util/api';

const Feedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const res = await getFeedbackApi();
            if (res) {
                setFeedbackList(res);
            }
        } catch (error) {
            console.error('Failed to fetch feedback:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            try {
                const res = await deleteFeedbackApi(id);
                if (res.success) {
                    alert(res.message || "Feedback deleted successfully");
                    fetchFeedback();
                } else {
                    alert(res.message || "Failed to delete Feedback");
                }
            } catch (error) {
                console.error("Error deleting Feedback:", error);
                alert(error.message || "Failed to delete Feedback");
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Feedbacks
            </Typography>

            {/* Nút Thêm Người Dùng */}
            <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
                <Link to="/admin/addfeedback">
                    <Button variant="contained" color="primary">
                        Add Feedback
                    </Button>
                </Link>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name User</TableCell>
                            <TableCell>Job</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedbackList.map((feedback) => (
                            <TableRow key={feedback._id}>
                                <TableCell>{feedback.name}</TableCell>
                                <TableCell>{feedback.job}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/admin/editfeedback/${feedback._id}`}>
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
                                            onClick={() => handleDeleteFeedback(feedback._id)}
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

export default Feedback;
