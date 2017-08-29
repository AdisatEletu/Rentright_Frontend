import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import Footer from './layouts/Footer';


export default class TenantInfo extends Component {


    render() {
        return (
            <div className=" tenant-guide t-flex t-align-content-stretch t-fullwidth  t-flex-column">
                <Helmet>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <div className="home-firstnav t-flex t-justify-space-between home-primary-color t-fullwidth t-align-center nav-pad-left-right">
                    <div className=" t-flex  t-fullheight t-justify-right t-right-f home-firstnav-innerdiv-left">
                        <span> The Ultimate Insider to the RentRight </span>
                    </div>
                    <div className="home-firstnav-innerdiv-right t-flex t-justify-center t-flex-row t-center-f t-fullheight">

                        <span className="home-breadcrumbs t-flex t-justify-center"><a href="/"> <i className="material-icons  " >home</i> Home</a></span>
                        <span className="home-breadcrumbs t-flex t-flex-row"><a href="/Register"><i className="material-icons ">person_add</i> Register</a></span>
                        <span className="home-breadcrumbs home-active"><i className="material-icons ">supervisor_account</i><a href="/sign-in" style={{color: '#ffffff'}}> Login</a></span>

                    </div>
                </div>
                <div className="t-md-10 t-flex tg-fst parallax ">
                    <div className="t-flex tg-cover t-md-10 ">
                        <div className="tenant-guide-header t-md-5 t-flex t-flex-column t-justify-center t-align-content-center ">
                            <span className="t-header t-flex m-ellipses">
                                As a Tenant
                            </span>

                            <span className="t-text ml-ellipses"> Renting an Apartment have never been easier! RentRight provides a system where you can get your dream apartment, Pay rent, hire Artisans, sign agreement in a few steps.
                            </span>

                            <div className="get-started-button t-flex t-md-2 t-align-content-center t-justify-center">
                                <span> Get Started </span>
                            </div>
                        </div>

                        <div className="tenant-guide-tes t-md-5 t-flex t-flex-column t-justify-center t-align-content-center ">
                            <div className="tenant-guide-video t-flex t-md-7">

                        </div>
                        </div>

                    </div>

                    </div>
                    <div className="t-md-10 t-flex tenant-process t-justify-space-between">
                    <div className="t-md-22 t-flex tenant-search-properties t-flex-column ">
                        <span className="tenant-guide-icon t-flex t-center-f t-flex-column">  <i className="fa fa-address-card-o" ></i></span>
                        <div className="t-profile-text t-flex t-flex-column t-md-10 t-center-f m-ellipses">
                            Profile
                        </div>
                        <div className="t-profile-description t-flex t-center-f t-flex-column t-md-10 ml-ellipses">
                            Found a perfect house?! Create your profile and send to any Landlord in a single click, at no cost.  </div>
                        <div className="t-flex t-justify-center"><span className="more-button t-flex t-md-4 t-align-content-center th-elipsis t-justify-center"> Read More</span></div>


                    </div>
                    <div className="t-md-22 t-flex tenant-search-properties t-flex-column ">
                        <span className="tenant-guide-icon t-flex t-justify-center">  <i className="fa fa-handshake-o" ></i></span>
                        <div className="t-profile-text t-flex t-flex-column t-md-10 t-center-f m-ellipses">
                            Pay Rent Online
                        </div>
                        <div className="t-profile-description t-flex t-center-f t-flex-column t-md-10 ml-ellipses">Pay rent directly from bank account or from your credit card, print or save invoice. Renting an apartment is that easy, right from the comfort of your room.  </div>
                        <div className="t-flex t-justify-center"><span className="more-button t-flex t-md-4 th-elipsis t-align-content-center t-justify-center"> Read More</span></div>

                    </div>
                    <div className="t-md-22 t-flex tenant-search-properties t-flex-column ">
                        <span className="tenant-guide-icon t-flex t-justify-center">  <i className="fa fa-wrench" ></i></span>
                        <div className="t-profile-text t-flex t-flex-column t-md-10 t-center-f m-ellipses">
                            Request Maintenance
                        </div>
                        <div className="t-profile-description t-flex t-center-f t-flex-column t-md-10 ml-ellipses">If there is any need for maintainance, contact your Landlord, send pictures of the damage and get it done by professional artisans available on RentRight.   </div>
                        <div className="t-flex t-justify-center t-md-10"><span className="more-button th-elipsis t-flex t-md-4 t-align-content-center t-justify-center"> Read More</span></div>

                    </div>
                    <div className="t-md-22 t-flex tenant-search-properties t-flex-column ">
                        <span className="tenant-guide-icon t-flex t-justify-center">  <i className="fa fa-address-card-o" ></i></span>
                        <div className="t-profile-text t-flex t-flex-column t-md-10 t-center-f m-ellipses">
                            Digital Leasing
                        </div>
                        <div className="t-profile-description t-flex t-center-f t-flex-column t-md-10 ml-ellipses"> Paper works are time consuming and stressful, rentright annihilate scanning and emailing lease documents back and forth. Sign your lease with your landlord online with ease. </div>
                        <div className="t-flex t-justify-center"><span className="more-button t-flex t-md-4 th-elipsis t-align-content-center t-justify-center"> Read More</span></div>
                    </div>
                </div>
               <Footer />
            </div>
        );


    }

}