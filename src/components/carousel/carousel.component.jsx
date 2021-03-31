import React from 'react';
import { useState, useEffect } from 'react';
import './carousel-container.style.css'
import Slide from  './carousel-slide.component'
import NavButton from './nav-button.component/carousel-buttons.component'

const Carousel = (props) => {

    useEffect(()=>{
        // Have to do timeout to prevent getting width before images are loaded
        // Could've used class component with "componentDidMount"
        setTimeout(()=>{
            calculateSliderWidth();
            calculateEachSlideProperties();
        },50)
    },[])
    const calculateSliderWidth = () =>{
        var totalWidth = 0;
        var content = props.children;

        for (let i = 0; i < content.length; i++) {
            i > 0 ? totalWidth = totalWidth + document.getElementById(`${i}`).getBoundingClientRect().width : '';
            setSliderNavBar(sliderNavBar => [...sliderNavBar, totalWidth])
        }
        setState({...state,width: totalWidth})
    }
    const calculateEachSlideProperties = () =>{
        for(let i = 0; i < props.children.length; i++){
            slideProps.push(
                {
                    id: i,
                    width: document.getElementById(`${i}`).getBoundingClientRect().width
                }
            )
        }
    }
    const [slideProps, setSlideProps] = useState ([]);
    const [sliderNavBar, setSliderNavBar] = useState([])
    const [state, setState] = useState(
        {
            X: 0,
            xDiff: 0,
            transition: "0s ease-in-out",
            isMoving: false,
            width: 0,
            transitionEnabled: false
        },
    )
    const startMoving = (e) =>{
        e = checkDeviceType(e);
        setState({...state,X: state.xDiff + e.clientX, isMoving: !state.isMoving})
    }
    const sliderMoving = (e) =>{
        e = checkDeviceType(e);
        state.isMoving != false
        ? setState({...state,xDiff: state.X - e.clientX})
        : ''
    }
    const stopMoving = (e) =>{
        setState({...state,isMoving: !state.isMoving});
        handleBounds();
        autoMoveSlide(e);
    }
    const handleOnSliderExit = () =>{
        setState({...state,isMoving: false});
    }
    const checkDeviceType = (e) =>{
        if(e.nativeEvent.touches)
        e = e.nativeEvent.touches[0];
        return e
    }
    const handleBounds = () =>{
        state.isMoving != false ? state.isMoving = false : ''

        // handle left side
        state.xDiff < 0
        ? setState({...state,xDiff: 0, transition: "0.3s ease-in-out", transitionEnabled: true})
        : ''

        // handle right side
        state.xDiff > state.width
        ? setState({...state,xDiff: state.width, transition: "0.3s ease-in-out", transitionEnabled: true})
        : ''

    }
    const disableTransition = () =>{
        setState({...state,transition: "0s ease-in-out", transitionEnabled: false});
    }
    const goToSlide = (e) =>{
        setState({...state, xDiff: sliderNavBar[e.target.id], transition: "0.5s ease-in-out"})
    }
    const autoMoveSlide = (e) =>{
        // cant pass event with target.id since event is called from input prop (e.g. image, or other) which does not have id (as ID is set based on input prop array length)
        // to find which slide is currently being clicked we have to use a little bit of math
        let activeSlideId = 0;
        console.log("current xDiff",state.xDiff);
        for(let i = 0; i < sliderNavBar.length; i++){
            if(state.xDiff >= sliderNavBar[i]){
                activeSlideId = i;
            }
        }
        console.log("active slide", activeSlideId);

        let currentSlideWidth = slideProps[activeSlideId].width;
        let currentSlideMiddlePoint = Math.abs(sliderNavBar[activeSlideId] - (currentSlideWidth / 2));

        if(state.xDiff > currentSlideMiddlePoint){
            console.log(`nextSlide`)
            console.log(state.xDiff,currentSlideMiddlePoint)
            setState({...state, xDiff: sliderNavBar[activeSlideId+1], transition: "0.5s ease-in-out"})

        } else if(state.xDiff >= currentSlideMiddlePoint){
            setState({...state, xDiff: sliderNavBar[activeSlideId+1], transition: "0.5s ease-in-out"})
        }
        else {
            console.log(`previousSlide`)
            setState({...state, xDiff: sliderNavBar[activeSlideId], transition: "0.5s ease-in-out"})
        }


        // if(state.xDiff < currentSlideMiddlePoint){
        //     // back to current
        // } else {
        //     // go to next
        // }


    }


    return (
        <div className="carousel-container">
            
            <div 
                className="container-slider"
                style={
                    {
                        transform: `translateX(${state.xDiff * (-1)}px)`,
                        transition: `${state.transition}`,
                        minWidth: state.width
                    }
                }
                onMouseDown={(e) => startMoving(e)}
                onMouseMove={(e) => sliderMoving(e)}
                onMouseUp={(e) => stopMoving(e)}
                
                onTouchStart={(e) => startMoving(e)}
                onTouchMove={(e) => sliderMoving(e)}
                onTouchEnd={(e) => stopMoving(e)}

                onMouseLeave={handleOnSliderExit}
                onTransitionEnd={disableTransition}

            >
                {
                    props.children.map((contentItem,index) =><Slide key={index} id={index} >{contentItem}</Slide>)
                }    
            </div>
            <div className="btn-container">
                {
                    props.children.map((content, index) => <NavButton goToSlide={goToSlide} key={index} id={index}/>)
                }
            </div>
        
            
        </div>
    )
}

export default Carousel
