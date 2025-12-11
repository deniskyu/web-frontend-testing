import React from 'react'
import './ReviewItem.css'
import {assets} from '../../../assets/assets.js'

const ReviewItem = ({name, description, ratingStars}) => {
  return (
    <div className="review-item-container">
        <h1 className="review-item-name">{name}</h1>
        <p className="review-item-description">{description}</p>
        <div className="review-item-rating-stars-container">
            {[...Array(ratingStars)].map((_, index) => (
            <img
                key={index}
                className="review-item-rating-stars"
                src={assets.rating_stars}
                alt={`${ratingStars} rating stars`}
            />
            ))}
        </div>
    </div>
  )
}

export default ReviewItem