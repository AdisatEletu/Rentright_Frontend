/**
 * Created by Adisat on 05/09/2017.
 */
import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import Footer from './layouts/Footer';
import {connect} from 'react-redux';


class NewTenantInfo extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        console.log(this.state);
        this.setState(this.props.auth.user)
    }
    componentDidUpdate(prevProps, prevState){
        console.log(this.state);
    }

    render() {
        return (
            <div className=" tenant-guide t-flex t-fullwidth t-align-stretch t-flex-column">
                <Helmet>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <div className="landing-nav t-fullwidth t-flex t-justify-space-between home-primary-color t-align-center nav-pad-left-right">

                    <a href="/"  className="landing-logo t-md-3" ></a>

                    <div className="home-firstnav-innerdiv-right t-flex t-justify-center t-flex-row t-center-f t-fullheight">

                        {this.props.auth.user ?
                            <span className="home-breadcrumbs"><a href="#"><i className="fa fa-user home-icons" />{this.props.auth.user.first_name} {this.props.auth.user.last_name}</a></span>
                            :
                            null
                        }
                        <span className="home-breadcrumbs home-active"><i className="fa fa-sign-out" />
                            {this.props.auth.user ?  <a href="/sign-out" style={{color: '#ffffff'}}> Logout</a> :<a href="/sign-in" style={{color: '#ffffff'}}> Login</a>}


                        </span>
                    </div>
                </div>
                <div className="t-flex t-md-10 tg-fst">
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
                <div className="t-how t-flex t-md-10 nav-pad-left-right t-flex-column">
                    <div className="tg-header t-flex  ">
                        How It Works
                    </div>
                    <span className="t-profile-description t-flex ">RentRight is a platform for rental and property management, search for properties based on location or type, sign lease and agreement, review Landlord/Property and share experience on your social media platform. </span>
                </div>
                <div className="t-md-10 t-flex tenant-process nav-pad-left-right ">
                    <div className="t-md-5 t-flex tenant-search-properties t-flex-column t-align-center ">
                        <span className="tenant-guide-icon t-align-content-center t-justify-center "><i className="fa fa-address-card-o " ></i></span>
                        <span className="t-md-10 t-profile-text t-center-f"> Profile </span>
                        <span className="t-md-10 t-profile-description t-center-f t-flex">
                            Found a perfect house?! Create your profile and send to any Landlord in a single click, at no cost.</span>
                    </div>
                    <div className="t-md-5 t-flex tenant-search-properties t-flex-column t-align-center ">
                        <span className="t-md-2 tenant-guide-icon t-align-content-center"><i className="fa fa-handshake-o" ></i></span>
                        <span className="t-md-10 t-profile-text t-center-f"> Pay Rent Online </span>
                        <span className="t-md-10 t-profile-description t-center-f t-flex">
                           Pay rent directly from bank account or from your credit card, print or save invoice. Renting an
                            apartment is that easy, right from the comfort of your room.</span>

                    </div>
                </div>
                <div className="t-md-10 t-flex tenant-process nav-pad-left-right ">
                    <div className="t-md-5 t-flex tenant-search-properties t-flex-column t-align-center ">
                        <span className="t-md-2 tenant-guide-icon t-align-content-center"><i className=" fa fa-wrench" ></i></span>
                        <span className="t-md-10 t-profile-text t-center-f ml-ellipses">  Request Maintenance </span>
                        <span className="t-md-10 t-profile-description t-center-f t-flex">
                           If there is any need for maintenance, contact your Landlord, send pictures
                            of the damage and get it done by professional artisans available on RentRight.</span>

                    </div>
                    <div className="t-md-5 t-flex tenant-search-properties t-flex-column t-align-center ">
                        <span className="t-md-2 tenant-guide-icon t-align-content-center"><i className="fa fa-address-card-o" ></i></span>
                        <span className="t-md-10 t-profile-text t-center-f"> Digital Leasing </span>
                        <span className="t-md-10 t-profile-description t-center-f t-flex">
                            Paper works are time consuming and stressful, rentright annihilate scanning
                            and emailing lease documents back and forth. Sign your lease with your landlord online with ease.</span>

                    </div>
                </div>
                <Footer />

            </div>
        );


    }

}

function matchStateToProps(state){
    return {
        auth:state.user.auth
    }
}

export default connect(matchStateToProps,{})(NewTenantInfo)