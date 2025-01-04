import React, { useEffect, useState } from 'react';
import testimonialCSS from './../Testimonials/Testimonial.module.css'
import { getFeedbackApi } from '../../util/api';

function Testimonial() {

    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const res = await getFeedbackApi();
            if (res && Array.isArray(res)) {
                const feedbacks = res.map((feedback) => ({
                    ...feedback,
                    images: feedback.images.map((imagePath) =>
                        `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`
                    ),
                }));
                setFeedback(feedbacks);
            } else {
                console.warn('No valid data received from API');
            }
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    return (
        <div className={`${testimonialCSS.Testimonial_wrapper} section`} id="testimonials">
            <div className={testimonialCSS.Testimonial_title}>
                <small className="section_heading">Testimonial</small>
                <h2>Happy Coustomer Thoughts</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
                    deserunt placeat a in et rem reiciendis animi voluptatem est! Velit?
                </p>
            </div>
            <div className={testimonialCSS.Testimonial_cards}>
                {feedback.map((feedback) => (
                    <div className={testimonialCSS.card} key={feedback._id}>
                        <p>{feedback.feedback}
                        </p>
                        <div className={testimonialCSS.profile}>
                            <img
                                src={feedback.images}
                                alt={feedback.feedback}
                            />
                            <h2>{feedback.name} <span>{feedback.job}</span></h2>
                            <i className="ri-double-quotes-l"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial