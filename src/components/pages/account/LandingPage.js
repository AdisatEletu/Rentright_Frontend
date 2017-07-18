/**
 * Created by Adizat on 12/07/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


function Rntt () {
    return(
        <div className="container">
            <div className="row">
                <div className="center-align">
                    <div className="rntt">
                        <h2> RentRight </h2>
                        <h5> Welcome to RentRight by algorism, Continue as: </h5>
                    </div>
                </div>
            </div>
        </div>

    );
}
 function Btn (){
    return(
        <div className="container">
            <div className="row">
                <div className="col m12">
                    <div className="col m6 s12">
                        <div className="button-margin">
                            <div className="center-align">
                                <a href="#" className="btn btn--primary"> Take a Tour </a>
                            </div>
                        </div>
                    </div>
                    <div className="col m6">
                        <div className="button-margin">
                            <div className="left-align">
                                <a href="#" className="btn btn--default"> Get it on the App Store </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
 }
 
 function PhoneImage() {
     return(
         <div className="container">
             <div className="row">
                 <img src="CSS/img/device1.png" alt="phone image" className="image" />
             </div>
         </div>
     );
     
 }
 
 function ContinueASLa() {
     return(
         <div className="col s12 m4">
             <Link to="/landlord/account_settings"> <div className="card crd">
                 <div className="card-color">
                     <span className="card-title"><b>Landlord</b></span>
                     <ul>
                         <li> Landlords  can list properties</li>
                         <li> Manage rental process</li>
                         <li>Get paid for rents</li>
                         <li> Check reviews before entering into contractual agreements</li>
                     </ul>
                 </div>
             </div>
             </Link>
         </div>
     );
 }

 function ContinueAsTe() {
     return(
         <div className="col m4 s12">
             <div className="card crd">
                 <div className="card-color">
                     <span className="card-title"><b>Tenant</b></span>
                     <ul>
                         <li> Tenants can find  accommodation</li>
                         <li> Manage rental process</li>
                         <li>Pay for rents</li>
                         <li> Check reviews before entering into contractual agreements</li>
                     </ul>
                 </div>
             </div>
         </div>
     );

 }
 function ContinueAsAg() {
     return(
         <div className="col m4 s12 ">
             <div className="card crd">
                 <div className="card-color">
                     <span className="card-title"><b>Agent</b></span>
                     <ul>
                         <li> Tenants can find  accommodation</li>
                         <li> Manage rental process</li>
                         <li>Pay for rents</li>
                         <li> Check reviews before entering into contractual agreements</li>
                     </ul>
                 </div>
             </div>
         </div>
     );
 }

export default class LandingPage extends Component{
     render(){
         return(
             <div>
                 <Rntt/>
                 <Btn/>
                 <PhoneImage/>
                 <div className="container">
                     <div className="row">
                         <div className="col m12">
                             <ContinueASLa/>
                             <ContinueAsTe/>
                             <ContinueAsAg/>

                         </div>
                     </div>
                 </div>
             </div>
         );
     }
}

