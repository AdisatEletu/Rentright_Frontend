/**
 * Created by Adisat on 07/09/2017.
 */
import React, {Component} from 'react';
import Footer from './layouts/Footer';
import PrimaryNav from './layouts/header/navigation/PrimaryNav';
class LandlordGuide extends Component{
    render (){
        return (
            <div className="landlord-guide t-flex t-md-10 t-align-stretch t-flex-column ">
                <helmet>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </helmet>

                <PrimaryNav/>

                <div className="t-flex t-md-10 landlord-guide-pic">
                    <div className="t-flex t-md-10 tg-cover  t-justify-center t-align-center ">
                        <div className="tenant-guide-header t-md-7 t-flex t-flex-column t-justify-center t-align-center ">


                            <span className="t-text ml-ellipses t-center-f"> Renting an Apartment have never been easier! RentRight provides a system where you can get your dream apartment, Pay rent, hire Artisans, sign agreement in a few steps.
                            </span>

                            <div className="get-started-button t-flex t-md-2 t-align-content-center t-justify-center">
                                <span> Get Started </span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="t-md-10 t-flex lg-s landlord-t-s nav-pad-left-right">
                    <div className="t-md-5  t-flex t-flex-column">
                        <span className="lg-header tg-header ">
                            Add Property
                        </span>
                        <span className="t-profile-description t-md-10">
                            This is an opportunity to get your property rented to the best applicant of your choice.
                            Describe your property, add quality photos of the interior and exterior view,
                            select amenities and put a price on it. keep in mind that good quality pictures are more attractive.

                        </span>
                    </div>
                    <div className="t-md-5 landlord-t-img  t-flex ">
                    </div>
                </div>

                <div className="t-md-10 t-flex lg-s landlord-t-s nav-pad-left-right">
                    <div className="t-md-5 landlord-t-img2  t-flex ">
                    </div>
                    <div className="t-md-5  t-flex t-flex-column">
                        <span className="lg-header tg-header ">
                            Screen Tenant
                        </span>
                        <span className="t-profile-description t-md-10">
                            RentRight help you find the perfect tenant, view tenant application, request for background check, accept or reject tenant's application.


                        </span>
                    </div>

                </div>
                <div className="t-md-10 t-flex lg-s landlord-t-s nav-pad-left-right">
                    <div className="t-md-5  t-flex t-flex-column">
                        <span className="lg-header tg-header ">
                            Collect Rent
                        </span>
                        <span className="t-profile-description t-md-10">
                            Enough of the checks!! RentRight provides agreement templates, secure payments, tenants can set automatic payment which give absolutely no room for late payment, and it automatically send reminder when rent is almost due
                        </span>
                    </div>
                    <div className="t-md-5 landlord-t-img3  t-flex ">
                    </div>
                </div>

                <div className="t-md-10 t-flex lg-s landlord-t-s nav-pad-left-right">
                    <div className="t-md-5 landlord-t-img5  t-flex ">
                    </div>
                    <div className="t-md-5  t-flex t-flex-column">
                        <span className="lg-header tg-header ">
                            Insure Your Property
                        </span>
                        <span className="t-profile-description t-md-10">
                            Enough of the checks!! RentRight provides agreement templates, secure payments, tenants can set automatic payment which give absolutely no room for late payment, and it automatically send reminder when rent is almost due
                        </span>
                    </div>

                </div>
                <div className="t-md-10 t-flex lg-s landlord-t-s nav-pad-left-right">

                    <div className="t-md-5  t-flex t-flex-column">
                        <span className="lg-header tg-header ">
                            Rate Tenant
                        </span>
                        <span className="t-profile-description t-md-10">
                            RentRight help you find the perfect tenant, view tenant application, request for background check, accept or reject tenant's application.


                        </span>
                    </div>
                    <div className="t-md-5 landlord-t-img6  t-flex ">
                    </div>
                </div>
            <Footer/>
            </div>
        );
    }
}


export default LandlordGuide;