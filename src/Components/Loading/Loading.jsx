import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className='loading-container'>
        <div className='loading-spinner'>
            <div className='spinner  h-2/6 w-2/6'></div>
            <p>Loading...</p>
        </div>
    </div>
  );
};

export default Loading;