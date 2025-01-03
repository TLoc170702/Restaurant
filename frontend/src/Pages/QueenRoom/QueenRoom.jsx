import React from "react";
import roomsCSS from './QueenRoom.module.css'
import Nav from '../../Components/Nav/Nav'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import roomImg1 from './../../assets/room-detail-1-1-900x560.jpg'
import roomImg2 from './../../assets/room-detail-2-900x560.jpg'
import roomImg3 from './../../assets/room-detail-3-900x560.jpg'
import roomImg4 from './../../assets/room-detail-4-900x560.jpg'
import roomImg5 from './../../assets/room-detail-5-900x560.jpg'
import roomImg6 from './../../assets/room-detail-6-900x560.jpg'

function QueenRoom () {
    return (
        <div className={`${roomsCSS.Rooms_wrapper} section`}>
            <Nav/>
            <div className={roomsCSS.Rooms_title}>
                <h2>Queen Room</h2>
            </div>
            <div className={roomsCSS.Rooms_cards} id="rooms">
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.RoomImage}>
                        <img src={roomImg1} alt="Rooms-images" />
                    </div>

                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.RoomImage}>
                        <img src={roomImg2} alt="Rooms-images" />
                    </div>
                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.RoomImage}>
                        <img src={roomImg3} alt="Rooms-images" />
                    </div>
                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.RoomImage}>
                        <img src={roomImg4} alt="Rooms-images" />
                    </div>
                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.RoomImage}>
                        <img src={roomImg5} alt="Rooms-images" />
                    </div>
                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.RoomImage}>
                        <img src={roomImg6} alt="Rooms-images" />
                    </div>
                </div>
                
            </div>
            <div className={roomsCSS.Rooms_cards1}>
                <div className={roomsCSS.Rooms_card} >
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the  
                        more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, 
                        discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"  
                        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during 
                        the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 
                        "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from 
                        the 1914 translation by H. Rackham.</p>
                </div>
                <div className={roomsCSS.Rooms_card}>
                    <div className={roomsCSS.Booking_container}>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Check In : - </label>
                            <input type="date" />   
                        </div>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Check Out :- </label>
                            <input type="date" />   
                        </div>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Adults :- </label>
                            <input type="text" />   
                        </div>
                        <div className={roomsCSS.input_wrapper}>
                            <label>Children :- </label>
                            <input type="text" />   
                        </div>
                        <h1>29$/Night</h1>
                        <button>Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueenRoom