import React, {Component} from 'react';

function Slides(props){

    return (
        <div id="slider" className="loading has-parallax">
            <div id="loading-icon"><i className="fa fa-cog fa-spin" /></div>
            <div className="owl-carousel homepage-slider carousel-full-width">
            {props.slides.map((slide)=>
                <div className="slide" key={slide.id}>
                    <div className="container">
                        <div className="overlay">
                            <div className="info">
                                <div className="tag price">{slide.price}</div>
                                <h3>{slide.address}</h3>
                                <figure>{slide.location}</figure>
                            </div>
                            <hr />
                            <a href="property-detail.html" className="link-arrow">Read More</a>
                        </div>
                    </div>
                    <img alt="" src={slide.img} />
                </div>
            )}
            </div>
        </div>

    );
}

export default class Slider extends Component{

    render(){
        const slides = [
            {id:1, img: "assets/img/slide-01.jpg",price: "$ 11,000",address: " David",location: "Lagos State"},
            {id:2, img: "assets/img/slide-01.jpg",price: "$ 11,000",address: " David",location: "Lagos State"},
            {id:3, img: "assets/img/slide-01.jpg",price: "$ 11,000",address: " David",location: "Lagos State"}
        ];

        return (
            <Slides slides={slides}/>
        );
    }
}