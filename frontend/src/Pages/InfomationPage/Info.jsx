import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import aboutCSS from './Info.module.css';
import Nav from '../../Components/Nav/Nav';
import { AuthContext } from "../../Components/context/auth.context";

function Login() {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <div className={`${aboutCSS.About_wrapper} section`} id="about">
            <Nav />
            <div className={aboutCSS.About_content}>
                <h2>Enjoy Your Vacation In <span>Our Hotel</span> And Get Lots Of Fun , <span>Happiness And Great Pleasure</span> .</h2>
            </div>

            <div className={aboutCSS.Rooms_card}>
                <div className={aboutCSS.Booking_container}>
                    <h2 style={{color: "#9b804e"}}>Client Information</h2>

                    <div className={aboutCSS.input_wrapper}>
                        <label>Email: </label>
                        <input
                            type="text"
                            defaultValue={auth.user.email} // Hiển thị tên người dùng từ context
                            readOnly // Tùy chọn thêm, nếu bạn chỉ muốn hiển thị và không cho chỉnh sửa
                        />   
                    </div>

                    <div className={aboutCSS.input_wrapper}>
                        <label>Username: </label>
                        <input
                            type="text"
                            defaultValue={auth.user.username} // Hiển thị email từ context
                            readOnly
                        />   
                    </div>

                    <button onClick={() => {
                        localStorage.removeItem("access_token"); // Xóa token khỏi localStorage
                        setAuth({
                            isAuthenticated: false,
                            user: {
                                email: "",
                                username: ""
                            }
                        });
                        navigate("/"); // Chuyển về trang chính sau khi đăng xuất
                    }}>Log Out</button>                       
                    
                    <Link to='/Register'>Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
