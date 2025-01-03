import React, { useEffect, useState } from 'react';
import staffCSS from './../Staffs/Staff.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from "swiper/modules";
import { getStaffApi } from '../../util/api';

function Staff() {

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const res = await getStaffApi();
            if (res && Array.isArray(res)) {
                const staffs = res.map((staff) => ({
                    ...staff,
                    images: staff.images.map((imagePath) =>
                        `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`
                    ),
                }));
                setStaff(staffs);
            } else {
                console.warn('No valid data received from API');
            }
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    return (
        <div className={`${staffCSS.Staff_wrapper} section`} id="staffs">
            <div className={staffCSS.staff_title}>
                <small className="section_heading">Precious</small>
                <h2>Meet Our Staff Members</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et unde aliquam ullam ex. Tempora, veniam.</p>
            </div>

            <div className={staffCSS.staff_container}>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={60}
                    speed={1500}
                    loop={true}
                    autoplay={
                        {
                            delay: 800,
                        }
                    }
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 40

                        },
                        768: {
                            slidesPerView: 2
                        },
                        900: {
                            slidesPerView: 3
                        },
                    }}
                    modules={[Autoplay]}
                >
                    {staff.map((staff) => (
                        <SwiperSlide key={staff._id}>
                            <div className={staffCSS.Staff_card}>
                                <img
                                    src={staff.images}
                                    alt={staff.staff}
                                />
                                <div className={staffCSS.staff_details}>
                                    <h3>{staff.staff}</h3>
                                    <p>{staff.position}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    )
}

export default Staff