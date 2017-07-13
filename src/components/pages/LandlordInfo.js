/**
 * Created by Adizat on 11/07/2017.
 */
import React, {Component} from 'react';
import NewPrimaryNav from './layouts/header/navigation/NewPrimaryNav'


function LDetails () {
    return(
        <div>
            <div className="row zeropadding">
                <div className="lightblue">
                    <div className="cover col  s12  valign-wrapper">
                        <div className="row">
                            <div className="col s6">
                                <b><h3 className="header-prop">As a Landlord</h3></b>
                                <div className="flow"><p className="flow-text"> RentRight provides a platform for you to conveniently Add your property(s), Screen and run background check on tenant,
                                    Collect rent online, Send due date reminder, Rate Tenant, Hire an Artisan, Get a professional to manage your property,
                                    Insure your Property, Sell Property... </p></div>
                            </div>
                            <div className="col s4">
                                <div className="hello">
                                    <img src="css/img/monitor.jpg" />
                                </div>
                            </div>
                        </div>{/*cover*/}
                    </div>{/*prebottom*/}
                    <div className="col s2">
                        <span className="Register_span"><a className="waves-effect waves-light btn custom_orange_button">Register</a></span>
                    </div>
                </div>
            </div>
            <div className="section white  mtop">
            </div>
        </div>
    )
    
}

function Addprop () {
    return(

        <div className="container">
            <div className="row">
                <div className="col s6">
                    <div className="right-align"><img className="responsive-img" src="css/img/Add_property.jpg" /></div>
                </div>
                <div className="col s6">
                    <h5 className="Add-property">  Add Property</h5>
                    <p className="flow-text_">
                        RentRight. Give description of your property, take interior and exterior pictures,
                        Add price, keep in mind that good quality pictures attracts tenants.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ScreenTenant() {
    return(
        <div className="container">
            <div className="row">
                <div className="col m6">
                    <h5 className="Add-property">  Screen Tenant</h5>
                    <p className="flow-text_">
                        RentRight help you find the perfect tenant, view tenant application, perform background check,
                    </p>
                </div>
                <div className="col m6">
                    <div className="left-align"><img className="responsive-img" src="css/img/Screen.png" /></div>
                </div>
            </div>
        </div>  
    );
    
}

    function CollectRent() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col m6">
                        <div className="right-align"><img className="responsive-img" src="css/img/rent.png" /></div>
                    </div>
                    <div className="col m6">
                        <h5 className="Add-property">  Collect Rent </h5>
                        <p className="flow-text_">
                            Enough of the checks!! RentRight provides agreement templates, secure payments, tenants could set automatic payment which give absolutely no room for late payemnt,
                            and it automatically send reminder when rent is almost due
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    function Maintenance (){
        return(
            <div className="container">
                <div className="row">
                    <div className="col m6">
                        <h5 className="Add-property">  Maintenance </h5>
                        <p className="flow-text_">
                            Lorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magicLorem Ipsum somas
                            ipsomas magicLorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magicLorem
                            Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas
                            magicLorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magic
                        </p>
                    </div>
                    <div className="col m6">
                        <div className="left-align"><img className="responsive-img" src="css/img/Maintanance.jpg" /></div>
                    </div>
                </div>
            </div>
        );
    }

    function InsureProp(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col m6">
                        <div className="right-align"><img className="responsive-img" src="css/img/Insurance.jpg" /></div>
                    </div>
                    <div className="col m6">
                        <h5 className="Add-property">  Insure Property </h5>
                        <p className="flow-text_">
                            This platform offers secure and automatic payment,
                            and it automatically send reminder when rent is almost due.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    function Rate(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col m6">
                        <h5 className="Add-property">  Rate Tenant </h5>
                        <p className="flow-text_">
                            Lorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magicLorem Ipsum somas
                            ipsomas magicLorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magicLorem
                            Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas
                            magicLorem Ipsum somas ipsomas magicLorem Ipsum somas ipsomas magic
                        </p>
                    </div>
                    <div className="col m6">
                        <div className="left-align"><img className="responsive-img" src="css/img/Landlord_rate.png" /></div>
                    </div>
                </div>
            </div>
        );
    }
export default class LandlordInfo extends Component{

    
    render(){
        return(
            <div>
            <NewPrimaryNav/>
                <LDetails/>
                <Addprop/>
                <ScreenTenant/>
                <CollectRent/>
                <Maintenance/>
                <InsureProp/>
                <Rate/>
            </div>
        );


    }




}
