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
    IconButton,
    Stack
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { getOfferApi, deleteOfferApi } from '../../util/api';


const Offers = () => {

    const [offerList, setOfferList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOffer();
    }, []);

    const fetchOffer = async () => {
        try {
            const res = await getOfferApi();
            if (res) {
                setOfferList(res);
            }
        } catch (error) {
            console.error('Failed to fetch offer:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDeleteOffer = async (id) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                const res = await deleteOfferApi(id);
                if (res.success) {
                    alert(res.message || "Offer deleted successfully");
                    fetchOffer(); // Cập nhật danh sách người dùng
                } else {
                    alert(res.message || "Failed to delete Offer");
                }
            } catch (error) {
                console.error("Error deleting Offer:", error);
                alert(error.message || "Failed to delete Offer");
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Offers
            </Typography>

            {/* Nút Thêm Người Dùng */}
            <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
                <Link to="/admin/addoffer">
                    <Button variant="contained" color="primary">
                        Add Offer
                    </Button>
                </Link>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Offer Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offerList.map((offer) => (
                            <TableRow key={offer._id}>
                                <TableCell>{offer.offer}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/admin/editoffer/${offer._id}`}>
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
                                            onClick={() => handleDeleteOffer(offer._id)}
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

export default Offers;
