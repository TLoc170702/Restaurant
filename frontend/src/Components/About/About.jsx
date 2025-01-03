import React from "react";
import aboutCSS from './../About/About.module.css'

import aboutImg1 from './../../assets/about-room.png'
import aboutImg2 from './../../assets/bedroom-about.png'
import aboutImg3 from './../../assets/signboard-about.png'
import aboutImg4 from './../../assets/swimming-pool-about.png'

function About() {
    return(
        <div className={`${aboutCSS.About_wrapper} section`} id="about">
            <div className={aboutCSS.About_content}>
                <small className="section_heading">About Us</small>
                <h2>Enjoy Your Vacation In <span>Our Hotel</span> And Get Lots Of Fun , <span>Happiness And Great Pleasure</span> .</h2>

                <button>Explore Now</button>
            </div>

            <div className={aboutCSS.About_cards}>
                <div className={aboutCSS.About_card}>
                    <img src={aboutImg1} alt="About-image" />
                    <h3>Tasty Cuisnes</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere doloremque repudiandae aliquid.</p>
                </div>
                <div className={aboutCSS.About_card}>
                    <img src={aboutImg2} alt="About-image" />
                    <h3>Fine Double Beds</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere doloremque repudiandae aliquid.</p>
                </div>
                <div className={aboutCSS.About_card}>
                    <img src={aboutImg3} alt="About-image" />
                    <h3>Free Medical Treatment</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere doloremque repudiandae aliquid.</p>
                </div>
                <div className={aboutCSS.About_card}>
                    <img src={aboutImg4} alt="About-image" />
                    <h3>Swimming Pool</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere doloremque repudiandae aliquid.</p>
                </div>
            </div>
        </div>
    )
}

export default About