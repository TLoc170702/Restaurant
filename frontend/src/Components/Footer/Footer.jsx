import React from "react";
import footerCSS from './../Footer/Footer.module.css'

function Footer () {
    return (
        <div className={`${footerCSS.footer_wrapper} section`}>
            <div className={footerCSS.footerLinks}>
                <h2>Contact</h2>
                <p><a href="#">Reservation</a></p>
                <p><a href="#">Misson & Vision</a></p>
                <p><a href="#">Hotel Facilities</a></p>
                <p><a href="#">News & blogs</a></p>
                <p><a href="#">Terms & Conditions</a></p>
            </div>
            <div className={footerCSS.footerLinks}>
                <h2>Help</h2>
                <p><a href="#">FAQ</a></p>
                <p><a href="#">Careers</a></p>
                <p><a href="#">Website Feedback</a></p>
                <p><a href="#">Service Guarantee</a></p>
            </div>
            <div className={footerCSS.footerLinks}>
                <h2>Our Service</h2>
                <p><a href="#">Store Directory</a></p>
                <p><a href="#">Top Hotels</a></p>
                <p><a href="#">Quick Links</a></p>
                <p><a href="#">Insights</a></p>
            </div>
            <div className={footerCSS.footerLinks}>
                <h2>About Us</h2>
                <p><a href="#">Company</a></p>
                <p><a href="#">Partners</a></p>
                <p><a href="#">Customers</a></p>
                <p><a href="#">Pricing</a></p>
            </div>
        </div>
    )
}

export default Footer