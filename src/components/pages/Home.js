import React,{Component} from 'react';
import Slider from "./layouts/header/Slider";

import Header from './layouts/Header';
import Footer from './layouts/Footer';

function Banner(){
    return (
        <section id="banner">
            <div className="block has-dark-background background-color-default-darker center text-banner">
                <div className="container">
                    <h1 className="no-bottom-margin no-border">Rent Right makes <a href="#.com" className="text-underline">rental process</a> and <a href="#.com" className="text-underline">property management</a> pleasurable and effective.!</h1>
                </div>
            </div>
        </section>
    );
}

export default class Home extends Component{

    render(){
        return(
        <div className="page-homepage navigation-fixed-top page-slider" id="page-top" data-spy="scroll" data-target=".navigation" data-offset={90}>
            <div className="wrapper" >
                <Header/>
                <Slider/>
                <div id="page-content">
                    <Banner/>
                </div>
                <div id="overlay" />
                <Footer/>
            </div>
        </div>



        );
    }
}