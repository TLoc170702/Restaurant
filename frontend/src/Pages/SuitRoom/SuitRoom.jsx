import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomsCSS from './SuitRoom.module.css'
import Nav from '../../Components/Nav/Nav'
import { getRoomByIdApi, orderApi } from '../../util/api';

import { ethers, BigNumber } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../util/contract';
import { useAuth } from '../../Components/context/auth.context'; // Đường dẫn phải chính xác

// import jwtDecode from 'jwt-decode';

import "swiper/css";


function SuitRoom() {

    const navigate = useNavigate();

    const { isAuthenticated, user, auth } = useAuth();

    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [formData, setFormData] = useState({
        checkinDate: '',
        checkoutDate: '',
        adults: '',
        children: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        fetchRoom();
    }, [id]);

    const fetchRoom = async () => {
        try {
            const res = await getRoomByIdApi(id);
            if (res) {
                const updatedRoom = {
                    ...res,
                    images: res.images.map((imagePath) =>
                        `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`
                    ),
                };
                setRoom(updatedRoom);
            } else {
                console.warn('Room not found');
            }
        } catch (error) {
            console.error('Failed to fetch room:', error);
            navigate('/error');
        }
    };

    // Kết nối ví Metamask
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        try {
            // Yêu cầu quyền truy cập tài khoản
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected account:", accounts[0]);

            // Kết nối với provider và signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Kiểm tra địa chỉ của signer
            const address = await signer.getAddress();
            console.log("Signer address:", address);

            if (address === null || address === "") {
                console.error("Signer address is null or empty.");
            } else {
                alert("Metamask Connected!");
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    };

    const bookRoom = async (roomId, price) => {
        try {
            if (!window.ethereum) {
                alert("Metamask is not installed!");
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const etherValue = ethers.utils.parseEther(price.toString());
            const transaction = await signer.sendTransaction({
                to: CONTRACT_ADDRESS,
                value: etherValue,
            });
            await transaction.wait();
            alert(`Room ${roomId} successfully booked!`);
        } catch (error) {
            console.error("Failed to book room:", error);
            alert("Failed to book room: " + error.message);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!auth || !auth.isAuthenticated || !auth.user) {
                alert('User not logged in. Please login first!');
                return;
            }

            const { username, email } = auth.user;
            const { checkinDate, checkoutDate, adults, children } = formData;

            if (!checkinDate || !checkoutDate || !adults || !children) {
                alert('Please fill in all fields!');
                return;
            }

            const payload = {
                username,
                email,
                room: room.room,
                checkinDate,
                checkoutDate,
                adults: Number(adults),
                children: Number(children),
            };

            console.log('Payload being sent to API:', payload);

            const response = await orderApi(payload); // Gọi API với payload

            if (response) {
                alert('Room successfully booked!');
            } else {
                alert(`Failed to book room: `);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Error submitting order!');
        }
    };

    if (!room) {
        return <p>Loading...</p>;
    }

    return (

        <div className={`${roomsCSS.Rooms_wrapper} section`}>
            <Nav />

            <div className={roomsCSS.Rooms_title}>
                <h2>{room.room || 'No Room Name'}</h2>
            </div>
            <div className={roomsCSS.Rooms_cards} id="rooms">
                {room.images.map((image, index) => (
                    <div className={roomsCSS.Rooms_card} key={index}>
                        <div className={roomsCSS.RoomImage}>
                            <img
                                src={image}
                                alt={`Room Image ${index + 1}`}
                                onError={(e) => {
                                    e.target.src = '/default-room.jpg'; // Hình ảnh mặc định 
                                }}
                                className={roomsCSS.RoomImage}
                            />
                        </div>
                    </div>
                ))}

            </div>
            <div className={roomsCSS.Rooms_cards1}>
                <div className={roomsCSS.Rooms_card} >
                    <p>{room.description || 'No description available'}</p>
                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.Booking_container}>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Check In:</label>
                            <input
                                type="date"
                                name="checkinDate"
                                value={formData.checkinDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Check Out:</label>
                            <input
                                type="date"
                                name="checkoutDate"
                                value={formData.checkoutDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Adults:</label>
                            <input
                                type="number"
                                name="adults"
                                value={formData.adults}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Children:</label>
                            <input
                                type="number"
                                name="children"
                                value={formData.children}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h1>{room.price} ETH/Night</h1>

                        <button onClick={handleSubmit}>Order</button>

                        <button onClick={connectWallet}>Connect Wallet</button>
                        <button onClick={() => bookRoom(room._id, room.price)}>Deposit money</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuitRoom