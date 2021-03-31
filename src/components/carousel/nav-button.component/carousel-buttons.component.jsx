import React from 'react'
import './carousel-buttons.style.css'

const CarouselButtons = ({ id, goToSlide }) => {
    return (
        <button id={id} onClick={(e)=>goToSlide(e)} className="slide-nav-bar"></button>
    ) 
}

export default CarouselButtons
