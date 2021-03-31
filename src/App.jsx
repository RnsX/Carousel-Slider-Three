import React, { Component } from 'react'
import Image1 from './img/Img1.jpg'
import Image2 from './img/Img2.jpg'
import Image3 from './img/Img3.jpg'
import CarouselContainer from './components/carousel/carousel.component'
import './App.style.css'


export class App extends Component {
    render() {
        return (
            <div className="App">
                <CarouselContainer>
                    <img draggable={false} src={Image1}/> 
                        <img draggable={false} src={Image2}/> 
                        <img draggable={false} src={Image3}/>
                        <div className="custom-content">
                            <h2>Some random text</h2>
                            <p>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        <div className="custom-content">
                            <h2>I am custom Html content</h2>
                            <input placeholder="write someting..."></input>
                            <input placeholder="write someting..."></input>
                            <input placeholder="write someting..."></input>
                            <input placeholder="write someting..."></input>
                            <button>Submit</button>
                            <button>Cancel</button>
                        </div>
                        <img draggable={false} src={Image3}/>
                </CarouselContainer>
            </div>
        )
    }
}

export default App

