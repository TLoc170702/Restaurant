import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import aboutCSS from './Register.module.css';
import Nav from '../../Components/Nav/Nav';
import { createUserApi } from "../../util/api";


function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {

        setError(""); // Xóa thông báo lỗi trước

        if (!username) {
            setError("Username cannot be empty.");
            return;
        }
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
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        createUserApi(username, email, password)
            .then((res) => {
                if (res && res.success) {
                    alert(res.message); // "User created successfully"
                    navigate("/login");
                } else {
                    alert(res ? res.message : "An unexpected error occurred. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An unexpected error occurred. Please try again.");
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
                    <small className="section_heading">Register</small>

                    <div className={aboutCSS.input_wrapper}>
                        <label>Username : - </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className={aboutCSS.input_wrapper}>
                        <label>Email : - </label>
                        <input type="email" value={email} autoComplete="new-email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={aboutCSS.input_wrapper}>
                        <label>Password : -</label>
                        <input type="password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={aboutCSS.input_wrapper}>
                        <label>Confirm Password : - </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button onClick={handleRegister}>Register</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <Link to="/Login">Login : -</Link>
                </div>
            </div>
        </div>
    );
}

export default Register