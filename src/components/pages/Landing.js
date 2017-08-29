/**
 * Created by Adisat on 29/08/2017.
 */
import React,{Component} from 'react';
import {Helmet} from "react-helmet";

export default class Landing extends Component{

    render ()   {

        return (
            <div className="t-md-10 t-fullheight t-flex landing-body">
                <Helmet>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </Helmet>


            </div>
        );
    }









}