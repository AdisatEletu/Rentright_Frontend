import React, {Component} from 'react';
import NewPrimaryNav from './layouts/header/navigation/NewPrimaryNav'



function TDetails(){
    return (
    <div>
        <div className = "row zeropadding">
        <div className="lightblue">
            <div className="cover col  s12  valign-wrapper">
                <div className="row">
                    <div className="col s6">
                        <b><h3 className="header-prop">As a Tenant</h3></b>
                        <div className="flow"><p className="flow-text"> Renting an Apartment have never been more easier!
                            RentRight provides a system where you can get your dream apartment, Pay rent, hire Artisans, sign agreement in a few steps. </p></div>
                    </div>
                    <div className="col s4">
                        <div className="hello">
                            <img src="css/img/monitor.jpg" />
                        </div>
                    </div>
                </div>{/*cover*/}
            </div>{/*prebottom*/}
            <div className="col s2">
                <span className="Register_span"><a className="waves-effect waves-light btn custom_orange_button">Get Started!</a></span>
            </div>
        </div>

    </div>
        <div className="section white  mtop">

        </div>
    </div>
    );
    
}

function SearchProp () {
    return(
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <div className="right-align"><img className="responsive-img" src="css/img/search_house.jpg" /></div>
                </div>
                <div className="col s6">
                    <h5 className="Add-property"> Search Property</h5>
                    <p className="flow-text_">
                        Search property based on location or based on the kind apartment you want, view interior and exterior images of the property, view review of the property by past Tenants
                        RentRight provides price range of houses according to your search, No over pay!
                    </p>
                </div>
            </div>
        </div>
    );
}

function SubmitApplication () {
    return(
        <div className="container">
            <div className="row">
                <div className="col m6">
                    <h5 className="Add-property"> Submit Application </h5>
                    <p className="flow-text_">
                        Found a perfect house for you?! Submit your application to the Landlord, Application template are readily available on the system, all is required is an updated profile.
                    </p>
                </div>
                <div className="col m6">
                    <div className="left-align"><img className="responsive-img" src="css/img/Profile.png" /></div>
                </div>
            </div>
        </div>
    );
}

function PayRent () {
    return(
        <div className="container">
            <div className="row">
                <div className="col m6">
                    <div className="right-align"><img className="responsive-img" src="css/img/pay_rent.png" /></div>
                </div>
                <div className="col m6">
                    <h5 className="Add-property">  Pay Rent </h5>
                    <p className="flow-text_">
                        Sign agreement, Pay rent directly from bank account or from your credit card, print or save invoice. Renting an apartment is that easy, right from the comfort of your room.
                    </p>
                </div>
            </div>
        </div>
    );
    
}

function TMaintenance() {
    return(
        <div className="container">
            <div className="row">
                <div className="col m6">
                    <h5 className="Add-property">  Maintainance </h5>
                    <p className="flow-text_">
                        If there is any need for maintainance,
                        contact your Landlord, send pictures of the damage and get it done
                        by professional artisans available on RentRight.
                    </p>
                </div>
                <div className="col m6">
                    <div className="left-align"><img className="responsive-img" src="css/img/maintanance2.png" /></div>
                </div>
            </div>
        </div>
    );
}

function RateLandlord() {
    return(
        <div className="container">
            <div className="row">
                <div className="col m6">
                    <div className="right-align"><img className="responsive-img" src="css/img/rate.png" /></div>
                </div>
                <div className="col m6">
                    <h5 className="Add-property">  Rate </h5>
                    <p className="flow-text_">
                        Rate Landlord/house
                    </p>
                </div>
            </div>
        </div>
    );

}
export default class TenantInfo extends Component {


    render() {
        return (
            <div>
                <NewPrimaryNav/>
                <TDetails/>
                <SearchProp/>
                <SubmitApplication/>
                <PayRent/>
                <TMaintenance/>
                <RateLandlord/>
            </div>
        );


    }

}