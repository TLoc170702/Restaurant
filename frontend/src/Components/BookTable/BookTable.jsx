import React from "react";
import bookTableCSS from './../BookTable/BookTable.module.css';

import TestimonialImg from './../../assets/home-1-testimonial-1.jpg'
import Card_img_1 from './../../assets/Amenities-image-box-1.png'
import Card_img_2 from './../../assets/Amenities-image-box-2.png'

function BookTable() {
    return (
        <div className={`${bookTableCSS.BookTable_wraper} section`} id="bookingTable">
            <div className={bookTableCSS.Testimonial}>
                <div className={bookTableCSS.Testimonial_wrapper}>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia amet expedita nobis sequi voluptates, eveniet inventore aperiam itaque illo fugiat doloremque quo deleniti modi enim nulla dolore ipsa aspernatur. Dolores."</p>

                    <div className={bookTableCSS.Profile}>
                        <img src={TestimonialImg} alt="user-image" />

                        <h2>Andriana Jemiala <span>Designer</span></h2>
                    </div>

                    <i className="ri-double-quotes-i"></i>

                </div>
            </div>
            <div className={bookTableCSS.bookTable_Container}>
                <small>Let's Enjoy</small>
                <h2>Book Your Table</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error eum non assumenda voluptatibus? Corrupti earum maxime sed accusantium rem obcaecati?</p>

                <div className={bookTableCSS.Cards}>
                    <div className={bookTableCSS.Card}>
                        <img src={Card_img_1} alt="Card-image" />

                        <div className={bookTableCSS.card_content}>
                            <h3>Restaurant - 10th Floor</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, aperiam repudiandae sint praesentium rerum magnam.</p>

                            <a href="#">Book a Table</a>
                        </div>

                    </div>
                    <div className={bookTableCSS.Card}>
                        <img src={Card_img_2} alt="Card-image" />

                        <div className={bookTableCSS.card_content}>
                            <h3>Restaurant - 11th Floor</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, aperiam repudiandae sint praesentium rerum magnam.</p>

                            <a href="#">Book a Table</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookTable