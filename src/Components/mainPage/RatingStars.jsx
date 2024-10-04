import React from 'react';
import './RatingStars.css';

const RatingStars = ({ rating }) => {
  
  return (
    <div className='star-rating'>
      {[...Array(5)].map((_ , index) => {
        const startFill = Math.min(Math.max(rating - index , 0) , 1) * 100;
        return (
          <div key={index} className='star-wrapper'>
            <div className='star'>
              <div className='star-filled' style={{width: `${startFill}%`}}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;