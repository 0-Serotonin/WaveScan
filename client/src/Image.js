import React from 'react'
import { useLocation } from "react-router-dom";

function Image() {
    const location = useLocation();
    console.log(location.state.imageUrl);
  return (
    <div className='background'>
        <div className='image'>
            <h1 className='image-header'>Scanned Image</h1>
            <img src={location.state.imageUrl} />
        </div>
        
    </div>
  )
}

export default Image