import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import roomsCSS from './../Rooms/Rooms.module.css'
import { getRoomApi } from '../../util/api';

function Rooms() {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        fetchRoom();
    }, []);

    const fetchRoom = async () => {
        try {
            const res = await getRoomApi();
            if (res && Array.isArray(res)) {
                const updatedRooms = res.map((room) => ({
                    ...room,
                    images: room.images.map((imagePath) =>
                        `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`
                    ),
                }));
                setRoomList(updatedRooms);
            } else {
                console.warn('No valid data received from API');
            }
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    return (
        <div className={`${roomsCSS.Rooms_wrapper} section`}>
            <div className={roomsCSS.Rooms_title}>
                <small className="section_heading">Royal & Luxury</small>
                <h2>Choose Elegant Room</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, vel repellat sapiente sequi eaque laborum amet vero sunt aut voluptatum.</p>
            </div>

            <div className={roomsCSS.Rooms_cards} id="rooms">
                {roomList.map((room) => (
                    <Link to={`/room/${room._id}`} key={room._id}>
                        <div className={roomsCSS.Rooms_card}>
                            <div className={roomsCSS.RoomImage}>
                                <img
                                    src={room.images[0] || '/default-room.jpg'}
                                    alt={room.room || 'Room'}
                                    onError={(e) => {
                                        e.target.src = '/default-room.jpg';
                                    }}
                                />
                            </div>
                            <div className={roomsCSS.Rooms_card_info}>
                                <p>{room.bed} - {room.guest} </p>
                                <h2>{room.room}</h2>
                            </div>
                            <p className={roomsCSS.price}>
                                ${room.price}/Night
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Rooms