import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import aboutCSS from './Login.module.css'
import Nav from '../../Components/Nav/Nav'
import { loginApi } from "../../util/api";

import { AuthContext } from "../../Components/context/auth.context";

function Login() {
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError(""); 
        if (!email) {
            setError("Email cannot be empty.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Password cannot be empty.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        loginApi(email, password)
            .then((res) => {
                if (res.EC === 0) {
                    localStorage.setItem("access_token", res.access_token);  // Lưu token vào localStorage
                    console.log("Đăng nhập thành công:", res.data);
                    alert("Login successful!");
                    setAuth({
                        isAuthenticated: true,
                        user: {
                            email: res?.user?.email ?? "",
                            username: res?.user?.username ?? ""
                        }
                    });

                    navigate("/"); // Chuyển trang chỉ khi login thành công
                } else {
                    alert(res.EM || "Login failed. Please try again.");  // Hiển thị thông báo lỗi
                }
            })
            .catch((error) => {
                console.error("Đăng nhập thất bại:", error);
                alert("Login failed. Please try again.");
            });


    };

    return (
        <div className={`${aboutCSS.About_wrapper} section`} id="about">
            <Nav />
            <div className={aboutCSS.About_content}>
                <h2>Enjoy Your Vacation In <span>Our Hotel</span> And Get Lots Of Fun , <span>Happiness And Great Pleasure</span> .</h2>
            </div>

            <div className={aboutCSS.Rooms_card}>
                <div className={aboutCSS.Booking_container}>
                    <small className="section_heading">Login</small>
                    <div className={aboutCSS.input_wrapper}>
                        <label>Email : - </label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={aboutCSS.input_wrapper}>
                        <label>Password : -</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={handleLogin}>Login</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <Link to='/Register'>Register : -</Link>
                </div>
            </div>
        </div>
    )
}

export default Login