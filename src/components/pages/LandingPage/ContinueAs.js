/**
 * Created by Adizat on 20/07/2017.
 */
import React, {Component} from 'react';
import SideText from './SideText';
import PhoneContainer from "./PhoneContainer";
import PrimaryNav from '../layouts/header/navigation/PrimaryNav';
import Copyright from '../layouts/footer/Copyright';
import {Helmet} from 'react-helmet';

export default class ContinueAs extends Component{
    render(){
        return(
            <div className = "t-fullheight t-fullwidth">
                <Helmet>
                    <link href="http://localhost:3000/CSS/working.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <div className="home-mainbody t-flex t-align-content-stretch t-fullwidth  t-flex-column">

                    <div className="line-firstnav t-flex t-justify-space-between home-primary-color t-align-center nav-pad-left-right">
                        <div className=" t-flex  t-fullheight t-justify-right t-right-f home-firstnav-innerdiv-left">
                            <span> The Ultimate Insider to the RentRight </span>
                        </div>
                        <div className="home-firstnav-innerdiv-right t-flex t-justify-center t-flex-row t-center-f t-fullheight">
                            <span className="home-breadcrumbs"><i className="material-icons ">person_add</i><a href="#"> Register</a></span>
                            <span className="home-breadcrumbs home-active"><i className="material-icons ">supervisor_account</i><a href="/sign-in" style={{color: '#ffffff'}}> Log Out</a></span>
                        </div>
                    </div>
                </div>
                <div className= "home t-fullwidth">
                    <div className = "grad t-fullheight  t-flex t-flex-row t-justify-space-between font-size-zero">
                             <SideText/>
                        <PhoneContainer/>
                    </div>
                </div>

            </div>
        );
    }

}