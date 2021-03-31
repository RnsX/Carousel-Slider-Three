  import React from 'react';
import { useState } from 'react';
import './carousel-slide.styles.css';

const CarouselSlide = (props) => {


    return (
        <div id={props.id} className="carousel-slide">
            {props.children}
        </div>
    )
}

export default CarouselSlide