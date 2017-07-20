/**
 * Created by Adizat on 10/07/2017.
 */
import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import PropTypes from 'prop-types';
//import appRoot from 'app-root-path';
import PopularLocation from "./views/PopularLocation";

    function PopularSearches () {
        return (
            <div className="section white  mtop">
                <div className="row">
                    <div className="left-align padleft">
                        <h3 className="header h33  self-orange">Popular Searches</h3>
                        <div className="left-align grey-text text-darken-3 sc">Check out recent searches by people in
                            Lagos...
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    function Tenant () {
        return(
            <div className="col s12 m6 l6 xl6 partimg findhome">
                <div className="partcover">
                    <div className="h1s"> For Tenants</div>
                    <ul className="h2s">
                        <li> Tenants can find  accommodation</li>
                        <li> Manage rental process</li>
                        <li>Pay for rents</li>
                        <li> Check reviews before entering into contractual agreements</li>
                    </ul>
                </div>
            </div>
        );
    }

    function Landlord() {
        return (
            <div className="col s12 m6 l6 xl6 partimg housefine"><div className="partcover">
                <div className="h1s"> For Landlords</div>
                <ul className="h2s">
                    <li> Landlords  can list properties</li>
                    <li> Manage rental process</li>
                    <li>Get paid for rents</li>
                    <li> Check reviews before entering into contractual agreements</li>
                </ul>
            </div>

            </div>

        );
    }

    function Dualpicture () {
        return(
            <div>
                <div className = "row dualpic">
                <div className="col s12 m6 l6 xl6 partimg inst">
                    <div className="partcover">
                        <div className="h1s"> For Institutions</div>
                        <ul className="h2s">
                            <li>Police</li>
                            <li> Courts</li>
                            <li>Estate Agencies</li>
                            <li> Insurance</li>
                            <li>Government</li>
                        </ul>
                    </div>
                </div>
                <div className="col s12 m6 l6 xl6 partimg prof"><div className="partcover">
                    <div className="h1s"> For Professionals</div>
                    <ul className="h2s">
                        <li> Estate Agents</li>
                        <li> Arbitrators</li>
                        <li>Handy Men</li>
                    </ul>
                </div></div>
            </div>
            </div>
        );

    }

    function Partners () {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="partner-margin">
                            <h4 className="colo">Our Partners</h4>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                      <div className="col m3">
                          <img src="CSS/img/ibm2.jpg" alt="Logo" ></img>

                      </div>
                        <div className="col m3">
                          <img src="CSS/img/ibm.jpg" alt="Logo" ></img>

                      </div>
                        <div className="col m3">
                          <img src="CSS/img/ibm3.jpg" alt="Logo" ></img>

                      </div>
                        <div className="col m3">
                            <img src="CSS/img/ibm.jpg" alt="Logo" ></img>

                        </div>
                        </div>
                    </div>
                </div>


        );

    }


export default class NewSecondaryNav extends Component{

    render(){

        return(
            <div>

                    <PopularSearches/>
                <div className = "section white hideoverflow">
                    <div className = " viewhold ">
                        <PopularLocation name="Adeniran Ogunsanya" text="lorem ipsum dolor sit Adeniran Ogunsanya" img="interior1"/>
                        <PopularLocation name="Ikoyi" text="lorem ipsum dolor sit Ikoyi" img="interior2"/>
                        <PopularLocation name="Banana Island" text="lorem ipsum dolor sit Banana Island " img="interior3"/>
                        <PopularLocation name="Bode Thomas" text="lorem ipsum dolor sit Bode Thomas" img="interior4"/>
                        <PopularLocation name="Ibeju Lekki" text="lorem ipsum dolor sit Ibeju Lekki" img="interior5"/>
                    </div>
                    <div className ="row center-align mbottom"><i className = "self-orange lpt fa fa-circle"></i><i className = "lpt fa fa-circle"></i><i className = "lpt fa fa-circle"></i></div>
                        <div className= "section white ">
                            <div className = "row dualpic">
                                <Tenant/>
                                <Landlord/>
                            </div>
                            <Dualpicture/>
                            <testimonial/>
                           <Partners/>
                        </div>


                </div>

            </div>


        );
    }
}


