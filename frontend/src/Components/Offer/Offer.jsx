import React, { useEffect, useState } from 'react';
import offerCSS from './../Offer/Offer.module.css'
import { getOfferApi } from '../../util/api';

function Offer() {

    const [offer, setOffer] = useState([]);

    useEffect(() => {
        fetchOffer();
    }, []);

    const fetchOffer = async () => {
        try {
            const res = await getOfferApi();
            if (res && Array.isArray(res)) {
                const offers = res.map((offer) => ({
                    ...offer,
                    images: offer.images.map((imagePath) =>
                        `http://localhost:8080/${imagePath.replace(/\\/g, '/')}`
                    ),
                }));
                setOffer(offers);
            } else {
                console.warn('No valid data received from API');
            }
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    return (
        <div className={`${offerCSS.offer_wrapper} section`} id="offer">
            <div className={offerCSS.offer_title}>
                <small className="section_heading">Amentites</small>
                <h2>know What Amenities Do We Offer</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat nam reprehenderit omnis obcaecati, vitae voluptatibus.</p>
            </div>

            <div className={offerCSS.offer_cards}>
                {offer.map((offer) => (
                    <div className={offerCSS.offer_card} key={offer._id}>
                        <img
                            src={offer.images}
                            alt={offer.offer}
                        />
                        <div className={offerCSS.offer_details}>
                            <h2>{offer.offer}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Offer