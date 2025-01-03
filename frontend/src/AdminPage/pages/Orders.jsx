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
import { getOrderApi, deleteOrderApi } from '../../util/api';

const Orders = () => {

    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const res = await getOrderApi();
            if (res) {
                setOrderList(res);
            }
        } catch (error) {
            console.error('Failed to fetch order:', error);
        }
        finally {
            setLoading(false);
        }
    };


    const handleDeleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const res = await deleteOrderApi(id);
                if (res.success) {
                    alert(res.message || "order deleted successfully");
                    fetchOrder();
                } else {
                    alert(res.message || "Failed to delete order");
                }
            } catch (error) {
                console.error("Error deleting order:", error);
                alert(error.message || "Failed to delete order");
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.username}</TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>{order.room}</TableCell>
                                <TableCell
                                    style={{
                                        color: 'blue',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                    }}>
                                    {order.confirm}
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/admin/confirmorder/${order._id}`}>
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
                                            onClick={() => handleDeleteOrder(order._id)}
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

export default Orders;
