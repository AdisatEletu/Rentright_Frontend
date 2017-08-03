import React,{Component} from 'react';
import {Helmet} from 'react-helmet';
import Header from './layouts/Header';
import Footer from './layouts/Footer';


export default class NewHome extends Component{

    render(){
        return(
            <div className= "application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet"/>
                </Helmet>
                <Header/>
                <Footer/>
            </div>




        );
    }
}/**
 * Created by Adizat on 10/07/2017.
 */
