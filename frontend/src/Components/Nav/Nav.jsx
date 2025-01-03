import React, { useContext, useRef, useEffect } from "react";
import navCSS from "./../Nav/Nav.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Nav() {
    const { auth } = useContext(AuthContext);
    console.log(auth);

    const menu = useRef(null);
    const navbar = useRef(null);

    const menuHandler = () => {
        if (menu.current) {
            menu.current.classList.toggle(navCSS.showMenu);
        } else {
            console.error("Menu element not found");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                navbar.current?.classList.add(navCSS.ScrollNav);
            } else {
                navbar.current?.classList.remove(navCSS.ScrollNav);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup listener khi component bị hủy
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={navCSS.nav_wrapper} ref={navbar}>
            <div className={navCSS.bottom_nav}>
                <div className={navCSS.logo}>
                    <Link to="/">Herittage</Link>
                </div>

                <ul ref={menu}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Room">Rooms</Link></li>
                    <li><a href="#offer">Offer</a></li>
                    <li><a href="#staffs">Our Staffs</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div className={navCSS.navBtns}>
                    {auth?.isAuthenticated ? (
                        <Link to="/info">
                            <h2 style={{ color: "#9b804e" }}>{auth?.user?.username}</h2>
                        </Link>
                    ) : (
                        <Link to="/Login">
                            <button>Login</button>
                        </Link>
                    )}
                </div>
                <div className={navCSS.bars} onClick={menuHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default Nav;
