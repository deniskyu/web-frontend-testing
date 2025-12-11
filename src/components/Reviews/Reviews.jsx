import React from 'react'
import './Reviews.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import ReviewItem from './ReviewItem/ReviewItem.jsx';
import {reviews} from '../../assets/assets.js'

const Reviews = () => {
  return (
    <div className="reviews-container" id="recenzii">
        <h2 className="reviews-title">Vezi recenziile clientilor nostri(google).</h2>
        <Swiper
            modules={[Autoplay]}
            spaceBetween={80}
            slidesPerView={1}
            loop={true}
            autoplay={{
            delay: 2250,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            }}
            className="reviews-swiper-container"
        >
            {
                Object.values(reviews).map((element, index) => {
                    return(
                        <SwiperSlide>
                            <ReviewItem 
                                key={index} 
                                name={element.nume} 
                                description={element.descriere} 
                                ratingStars={element.rating}
                            />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    </div>
  )
}

export default Reviews