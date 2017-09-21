import React,{Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import FooterMain from './layouts/footer/FooterMain';
import PrimaryNav from './layouts/header/navigation/PrimaryNav';

export default class NewHome extends Component{


    render(){
        return(
            <div className="home-mainbody t-flex t-align-content-stretch t-fullwidth  t-flex-column">
                <Helmet>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <PrimaryNav/>
                <div className="home-second-div t-flex t-justify-space-between t-align-center  t-flex-row nav-pad-left-right ">
                    <div className="t-flex t-justify-right t-align-center t-fullheight  ">
                        <div className="t-flex-column t-flex rentright-logo" />
                    </div>
                    <div className="t-flex t-justify-left contact-div lato ">
                        <div className="t-flex icon-text-holder">
                        <span className=" t-flex t-flex-column t-align-left ">
                          <i className="material-icons icon-props  ">place</i>
                        </span>
                            <div className=" t-flex t-flex-column t-align-left t-justify-space-between pad-left-15"><span className="address"> 74 Raymond Njoku street</span><span>Ikoyi, Lagos.</span></div></div>
                        <div className="t-flex icon-text-holder">
                        <span className="t-flex  t-align-left  t-flex-column ">
                          <i className="material-icons icon-props ">call</i>
                        </span>
                        <div className="t-flex  t-align-left t-justify-space-between t-flex-column pad-left-15">
                            <span className="phone-no">  +234 802 2231 719 </span> <span><a href="#">Info@rentright.com</a></span></div></div>
                    </div>
                </div>
                <div className="home-third-div t-flex t-align-center  t-flex-row nav-pad-left-right">
                    <div className="bar-box t-flex t-align-center t-justify-space-between t-md-10 ">
                        <div className="t-flex t-flex-row t-align-center t-justify-left t-md-6">
                            <span className="bar-breadcrumbs bar-tabs  bar-tabs-active"><a href="/landlord-guide">LANDLORD</a></span>
                            <span className="bar-breadcrumbs bar-tabs "><a href="/tenant-guide">TENANT</a></span>
                            <span className="bar-breadcrumbs bar-tabs "><span>INSTITUTIONS</span><i className="material-icons ">keyboard_arrow_down</i></span>
                            <span className="bar-breadcrumbs bar-tabs "> PROFESSIONALS<i className="material-icons">keyboard_arrow_down</i></span>
                        </div>
                        <div className="home-search-field t-flex-row t-flex t-justify-space-between t-align-center t-md-3">
                            <input type="text" placeholder="Search Cities ..." className="home-first-search" />
                            <i className=" home-search-icon material-icons">search</i>
                        </div>
                    </div>
                </div>
                <div className="picture-div t-flex t-fullwidth interior1 home-slider t-fullheight home-bxshadow ">
                    <div className="home-cover">
                    </div></div>
                <div className="home-body-search t-flex t-align-center nav-pad-left-right t-justify-center ">
                    <div className="home-search t-flex t-md-10 t-flex-column home-pad">

                        <div className="home-search-holder t-flex t-flex-column t-md-10">

                            <div className="t-flex t-fullheight t-flex-row key-crumbs t-md-10 t-justify-space-between t-align-top home-top-pad ">
                                <div className="t-flex t-flex-column t-align-space-between t-md-3 t-justify-center home-search-wrapper">
                                    <label className="home-label">Keyword</label>
                                    <div className="home-search-items t-flex t-md-10 ">
                                        <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-10" id="keyword" />
                                    </div>
                                </div>
                                <div className="t-flex t-flex-column t-align-space-between t-md-3 t-justify-center home-search-wrapper">
                                    <label className="home-label">Location</label>
                                    <div className="home-search-items t-flex t-md-10 ">
                                        <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        <i className="material-icons home-search-icon2 t-md-2">keyboard_arrow_down</i>
                                    </div>
                                </div>
                                <div className="t-flex t-flex-column t-align-space-between t-md-3 t-justify-center home-search-wrapper">
                                    <label className="home-label">Property Type</label>
                                    <div className="home-search-items t-flex t-md-10 ">
                                        <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        <i className="material-icons home-search-icon2 t-md-2">keyboard_arrow_down</i>
                                    </div>
                                </div>
                            </div>
                            <div className="t-flex t-fullheight t-flex-row key-crumbs t-md-10 t-justify-space-between t-align-top home-top-pad ">
                                <div className="t-flex t-flex-row t-justify-space-between t-md-3 home-search-wrapper2">
                                    <div className="t-flex t-flex-column t-md-45 t-justify-center t-align-space-between  ">
                                        <label className="home-label m-ellipses home-label-top">Min Bedrooms</label>
                                        <div className="home-search-items t-flex t-md-10  ">
                                            <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        </div>
                                    </div>
                                    <div className="t-flex t-flex-column t-md-45 t-justify-space-between">
                                        <label className="home-label m-ellipses home-label-top">Min Bathrooms</label>
                                        <div className="home-search-items t-flex t-md-10 ">
                                            <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        </div>
                                    </div>
                                </div>
                                <div className="t-flex t-flex-row t-justify-space-between t-md-3 home-search-wrapper2">
                                    <div className="t-flex t-flex-column t-md-45 t-justify-center t-align-space-between  ">
                                        <label className="home-label m-ellipses home-label-top ">Min Area (Sq ft)</label>
                                        <div className="home-search-items t-flex t-md-10 ">
                                            <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        </div>
                                    </div>
                                    <div className="t-flex t-flex-column t-md-45 t-justify-space-between">
                                        <label className="home-label m-ellipses home-label-top ">Max Area (Sq ft)</label>
                                        <div className="home-search-items t-flex t-md-10 ">
                                            <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        </div>
                                    </div>
                                </div>
                                <div className="t-flex t-flex-row t-justify-space-between t-md-3 home-search-wrapper2">
                                    <div className="t-flex t-flex-column t-md-45 t-justify-center t-align-space-between  ">
                                        <label className="home-label m-ellipses home-label-top ">Min Price ( # )</label>
                                        <div className="home-search-items t-flex t-md-10 ">
                                            <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        </div>
                                    </div>
                                    <div className="t-flex t-flex-column t-md-45 t-justify-space-between">
                                        <label className="home-label m-ellipses home-label-top ">Max Price ( # )</label>
                                        <div className="home-search-items t-flex t-md-10">
                                            <input type="text" placeholder="Enter Keyword" className="home-keyword t-md-8" id="keyword" />
                                        </div>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <div className="t-flex  t-flex-row t-md-10 t-justify-space-between classbottom ">
                            <div className="t-flex  t-md-45 home-view-deals lato t-align-content-center t-justify-space-between">
                                <span>View Deals</span>
                                <i className="material-icons">arrow_forward</i>
                            </div>
                            <div className="t-flex  t-md-45 home-view-deals2  t-justify-space-between ">
                                <span>Search</span>
                                <i className="material-icons">arrow_forward</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="t-flex home-fourth-div t-flex-row t-md-10 t-justify-space-around t-align-top "><div className="home-fourth-div-cover ">
                    <div className="home-div-outer t-fullheight t-flex t-justify-space-around t-md-10  t-align-center nav-pad-left-right">
                        <div className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">vpn_key</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses"> Quick Deals</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                        <div className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">thumb_up</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses"> Experience</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                        <div className="home-div-outer-box t-flex-column t-flex t-center-f t-justify-center t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">star_border</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses">  Exclusive Offers</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                        <div className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">favorite_border</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses"> Happy Clients</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="home-fifth-div t-flex nav-pad-left-right t-md-10 t-justify-center t-align-center t-flex-column">
                    <div className="home-rent-ad t-flex t-center-f t-align-center t-justify-center"> Best Offer for Rent
                    </div>
                    <div className=" t-flex t-align-center t-md-10 t-justify-center home-hr-super">
                        <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover">
                            <div className="t-hr t-md-3 t-fullheight" />
                        </div>
                    </div>
                    <div className="home-rent-ad-details t-flex t-center-f t-md-7 t-align-center t-justify-center"> Best Offer for Rent  Best Offer for Rent
                        Best Offer for Rent Best Offer
                        for Rent Best Offer for Rent Best Offer for Rent Best Offer for
                        Rent Best Offer for Rent Best Offer for Rent Best Offer for Rent
                    </div>
                </div>
                <div className="home-ad-picture-holder t-flex t-md-10 t-flex-row nav-pad-left-right">
                    <div className="home-ad-picture t-flex t-md-5">
                        <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column t-align-content-space-between">
                            <div className="t-flex t-flex-row">
                                <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> #500,000 /Year</span>
                             </div>
                            <div className=" home-aplicants t-flex t-md-10  ">
                                <div className=" t-flex t-md-5 t-align-center home-applicants-left  ">
                                    <div className="t-flex home-aplicant-picture" />
                                    <span className="home-aplicant-name t-align-center t-flex ">Ngozi John</span>
                                </div>
                                <div className="t-flex home-applicant-right t-justify-center t-md-5 t-align-center">
                                    <div className="t-flex home-aplicant-picture2 t-align-center " />
                                    <div className="t-flex home-aplicant-picture3 t-align-center " />
                                    <div className="t-flex home-aplicant-picture4 t-align-center" />
                                    <div className="t-flex home-no-of-applicant t-align-center montserrat"> 3 Applicants</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-ad-info t-flex t-fullheight t-md-5 t-flex t-align-space-between t-flex-column">
                        <div className="ad-info-address t-md-10"> 722rd, Festac Town, Lagos.
                        </div>
                        <div className="ad-proptype t-flex t-md-10">Apartment</div>
                        <div className="t-flex ad-description1 t-flex-row t-md-10 t-justify-space-between ">
                            <div className="t-flex t-flex-column t-md-45">
                                <div className="t-flex  t-md-10 t-justify-left">
                                    4 bedrooms, 3quarter baths<br/>
                                    Home size: 1850 Sq ft<br/>
                                   Lot size: 7000 Sq ft
                                </div>
                            </div>


                            <div className="ad-divider t-flex t-flex-column t-md-1 t-align-center " >

                            </div>


                            <div className="t-flex t-flex-column t-md-45">
                                <div className="t-flex  t-md-10 t-flex-column t-justify-left">
                                    <span>Year Built: 2014</span>
                                    <span> Parking Spot: 2 </span>
                                   <span> Days on market: 205</span>
                                </div>
                            </div>
                        </div>
                        <div className="t-flex ad-view-offer t-flex-row t-md-10 t-justify-space-between ">
                            <div className="ad-view-offer-btn t-flex t-flex column t-md-45 t-align-center t-justify-space-between"> <span>View offer </span><i className="material-icons t-justify-right ">arrow_forward</i></div>
                            <div className="ad-view-offer-btn2 t-flex t-flex column t-md-45 t-align-center t-justify-space-between"><span> Add to Favourite</span><i className="material-icons t-justify-right ">favorite</i></div>
                        </div>
                    </div>
                </div>
                <div className="home-agents-div t-flex t-md-10">
                    <div className="home-agents-details t-flex  t-md-5 t-flex-column"><div className="home-agent-header t-flex t-justify-right">Feel Free to Contact Our Agents</div>
                        <div className=" t-flex t-md-10 t-justify-right home-hr-super2">
                            <div className="t-flex t-md-3 t-justify-right t-fullheight home-t-hr-cover2">
                                <div className="t-hr t-md-3 t-fullheight" />
                            </div>
                        </div>
                        <div className="home-agents-info t-flex t-md-10 t-justify-right t-center-f ">
              <span>Feel free to contact any of our agents for enquires.
                Feel free to contact any of our agents for enquires.
                Feel free to contact any of our agents for enquires.
                Feel free to contact any of our agents for enquires.</span>
                        </div>
                        <div className="home-agents-contact  t-flex t-md-10">


                            <div className="home-agents-holder1 t-flex  t-md-5 ">
                                    <div className="home-agents-pics1 t-flex t-justify-left t-md-4 " >

                                    </div>
                                    <div className="t-flex home-agent-phone-name t-md-6 t-flex-column">
                                        <div className="home-agents-name t-flex t-md-10">Dee Newton</div>
                                        <div className="home-agents-phone t-flex t-md-10 t-justify-space-between"><i className="fa fa-phone t-md-1" /><span className="t-md-9">+234 802 2231 719</span>
                                        </div>
                                    </div>
                            </div>

                            <div className="home-agents-holder2 t-flex  t-md-5 ">
                                    <div className="home-agents-pics2 t-flex t-justify-right t-md-4 " >

                                    </div>
                                        <div className="t-flex home-agent-phone-name1 t-md-6 t-flex-column">
                                         <div className="home-agents-name t-flex t-md-10">Helen Green
                                         </div>
                                            <div className="home-agents-phone t-flex t-md-10 "> <i className="fa fa-phone t-md-1" /> <span className="t-md-9">+234 802 2231 719</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-agents-picture t-flex  t-md-5" />
                </div>
                <div className="home-newest-offer-div t-flex nav-pad-left-right t-md-10 t-justify-center t-align-center t-flex-column ">
                    <div className="home-newest-header t-flex t-center-f t-align-center t-justify-center"> Newest Offer </div>
                    <div className=" t-flex t-align-center t-md-10 t-justify-center home-hr-super3">
                        <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover3">
                            <div className="t-hr t-md-2 t-fullheight" />
                        </div>
                    </div>
                    <div className="home-newest-details t-center-f t-align-center t-justify-center t-md-7">Newest Offer Newest Offer Newest Offer
                        Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer
                        Newest Offer Newest Offer Newest Offer</div>
                </div>
                <div className="home-newest-properties-div t-flex nav-pad-left-right t-md-10 ">
                    <div className="home-properties-holder t-flex t-md-10 t-justify-space-between t-align-center">
                        <div className="home-property1 t-flex t-md-48 t-flex-column">
                            <div className="home-property-picture1 t-flex t-md-10">
                                <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column ">
                                    <div className="t-flex t-flex-row">
                                        <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> #12,000 /month</span>
                                        <span className="t-flex home-newest-property-fav t-md-7 t-justify-right t-align-center "><i className="material-icons ">favorite_border</i> </span>
                                    </div>
                                    <div className=" home-aplicants t-flex t-md-10  ">
                                        <div className=" t-flex t-md-5 t-align-center  ">
                                            <div className="t-flex home-aplicant-picture" />
                                            <span className="home-aplicant-name t-align-center t-flex ">Ngozi John</span>
                                        </div>
                                        <div className="t-flex home-applicant-right t-justify-center t-md-5 t-align-center">
                                            <div className="t-flex home-aplicant-picture2 t-align-center " />
                                            <div className="t-flex home-aplicant-picture3 t-align-center " />
                                            <div className="t-flex home-aplicant-picture4 t-align-center" />
                                            <div className="t-flex home-no-of-applicant t-align-center montserrat"> 3 Applicants</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home-newest-location t-flex t-flex-column t-md-10  t-justify-center">
                                <div className="home-newest-address t-flex t-align-left t-md-7 "><i className="material-icons ">place</i> 722rd Festac town, Lagos.</div>
                                <br /><br />
                                <div className="home-newest-size t-flex t-md-10 t-justify-space-between ">
                                    <div className="home-square-size t-flex t-md-32">
                                        <span><i className="material-icons ">home</i> 450 Sq m</span>
                                    </div>
                                    <div className="home-room-size t-flex t-md-32">
                                        <span><i className="fa fa-cube" />4 rooms</span>
                                    </div>
                                    <div className="home-bathroom-size t-flex t-md-32">
                                        <span><i className="fa fa-bathtub" />2 bathrooms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-property2 t-flex t-md-48 t-flex-column">
                            <div className="home-property-picture2 t-flex t-md-10 t-justify-space-between ">
                                <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column t-align-content-space-between">
                                    <div className="t-flex t-flex-row">
                                        <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> #12,000 /month</span>
                                        <span className="t-flex home-newest-property-fav t-md-7 t-justify-right t-align-center "><i className="material-icons ">favorite_border</i> </span>
                                    </div>
                                    <div className=" home-aplicants t-flex t-md-10  ">
                                        <div className=" t-flex t-md-5 t-align-center  ">
                                            <div className="t-flex home-aplicant-picture" />
                                            <span className="home-aplicant-name t-align-center t-flex ">Ngozi John</span>
                                        </div>
                                        <div className="t-flex home-applicant-right t-justify-center t-md-5 t-align-center">
                                            <div className="t-flex home-aplicant-picture2 t-align-center " />
                                            <div className="t-flex home-aplicant-picture3 t-align-center " />
                                            <div className="t-flex home-aplicant-picture4 t-align-center" />
                                            <div className="t-flex home-no-of-applicant t-align-center montserrat"> 3 Applicants</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home-newest-location t-flex t-flex-column t-md-10 t-align-content-space-between  t-justify-center">
                                <div className="home-newest-address t-flex t-align-left t-md-7 "><i className="material-icons ">place</i> 722rd Festac town, Lagos.</div>
                                <br /><br />
                                <div className="home-newest-size t-flex t-md-10 t-justify-space-between ">
                                    <div className="home-square-size t-flex t-md-32">
                                        <span><i className="material-icons ">home</i> 450 Sq m</span>
                                    </div>
                                    <div className="home-room-size t-flex t-md-32">
                                        <span><i className="fa fa-cube" />< span className="home-size-hover"> 4 rooms</span></span>
                                    </div>
                                    <div className="home-bathroom-size t-flex t-md-32">
                                        <span><i className="fa fa-bathtub" />2 bathrooms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-newest-properties-div t-flex nav-pad-left-right t-md-10 ">
                    <div className="home-properties-holder t-flex t-md-10 t-justify-space-between t-align-center">
                        <div className="home-property3 t-flex t-md-48 t-flex-column">
                            <div className="home-property-picture3 t-flex t-md-10">
                                <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column ">
                                    <div className="t-flex t-flex-row">
                                        <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> #12,000 /month</span>
                                        <span className="t-flex home-newest-property-fav t-md-7 t-justify-right t-align-center "><i className="material-icons ">favorite_border</i> </span>
                                    </div>
                                    <div className=" home-aplicants t-flex t-md-10  ">
                                        <div className=" t-flex t-md-5 t-align-center  ">
                                            <div className="t-flex home-aplicant-picture" />
                                            <span className="home-aplicant-name t-align-center t-flex ">Ngozi John</span>
                                        </div>
                                        <div className="t-flex home-applicant-right t-justify-center t-md-5 t-align-center">
                                            <div className="t-flex home-aplicant-picture2 t-align-center " />
                                            <div className="t-flex home-aplicant-picture3 t-align-center " />
                                            <div className="t-flex home-aplicant-picture4 t-align-center" />
                                            <div className="t-flex home-no-of-applicant t-align-center montserrat"> 3 Applicants</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home-newest-location t-flex t-flex-column t-md-10  t-justify-center">
                                <div className="home-newest-address t-flex t-align-left t-md-7 "><i className="material-icons ">place</i> 722rd Festac town, Lagos.</div>
                                <br /><br />
                                <div className="home-newest-size t-flex t-md-10 t-justify-space-between ">
                                    <div className="home-square-size t-flex t-md-32">
                                        <span><i className="material-icons ">home</i> 450 Sq m</span><br/>
                                    </div>
                                    <div className="home-room-size t-flex t-md-32">
                                        <span><i className="fa fa-cube" />4 rooms</span><br/>
                                    </div>
                                    <div className="home-bathroom-size t-flex t-md-32">
                                        <span><i className="fa fa-bathtub" />2 bathrooms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-property4 t-flex t-md-48 t-flex-column">
                            <div className="home-property-picture4 t-flex t-md-10 t-justify-space-between ">
                                <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column t-align-content-space-between">
                                    <div className="t-flex t-flex-row">
                                        <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> #12,000 /month</span>
                                        <span className="t-flex home-newest-property-fav t-md-7 t-justify-right t-align-center "><i className="material-icons ">favorite_border</i> </span>
                                    </div>
                                    <div className=" home-aplicants t-flex t-md-10  ">
                                        <div className=" t-flex t-md-5 t-align-center  ">
                                            <div className="t-flex home-aplicant-picture" />
                                            <span className="home-aplicant-name t-align-center t-flex ">Ngozi John</span>
                                        </div>
                                        <div className="t-flex home-applicant-right t-justify-center t-md-5 t-align-center">
                                            <div className="t-flex home-aplicant-picture2 t-align-center " />
                                            <div className="t-flex home-aplicant-picture3 t-align-center " />
                                            <div className="t-flex home-aplicant-picture4 t-align-center" />
                                            <div className="t-flex home-no-of-applicant t-align-center montserrat"> 3 Applicants</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home-newest-location t-flex t-flex-column t-md-10 t-align-content-space-between  t-justify-center">
                                <div className="home-newest-address t-flex t-align-left t-md-7 "><i className="material-icons ">place</i> <span>722rd Festac town, Lagos.</span></div>
                                <br />
                                <div className="home-newest-size t-flex t-md-10 t-justify-space-between ">
                                    <div className="home-square-size t-flex t-md-32">
                                        <span><i className="material-icons ">home</i> 450 < span className="home-size-hover">Sgm</span></span>
                                    </div>
                                    <div className="home-room-size t-flex t-md-32">
                                        <span><i className="fa fa-cube" /> 4 < span className="home-size-hover">rooms</span></span>
                                    </div>
                                    <div className="home-bathroom-size t-flex t-md-32">
                                        <span><i className="fa fa-bathtub" />2 < span className="home-size-hover">Bathrooms</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="t-flex home-testimonial "><div className="home-testimonial-cover t-flex t-fullheight t-fullwidth">
                    <div className="home-testimonial-text-holder t-fullheight t-flex t-justify-center t-flex-column t-md-10  t-align-center">
                        <div className="home-tes t-flex t-md-8 t-justify-center "> Testimonials</div>
                        <div className="home-tes2 t-flex t-md-7 t-justify-center"> We're Proud of Our Work</div>
                        <div className=" t-flex t-align-center t-md-5 t-justify-center home-hr-super">
                            <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover">
                                <div className="t-hr t-md-2 t-fullheight" />
                            </div>
                        </div>
                        <div className="home-tes3 t-flex t-md-4 t-center-f t-justify-center">If you are looking for a place for your property to be taken care of
                            you are right here. Amazed by the professionalism and attitude to the client.
                            Highly recommended.
                        </div>
                        <div className="home-tes-picture-holder t-flex t-md-6 t-justify-center t-align-center">
                            <div className="t-justify-space-between t-flex r-h t-md-2">
                                <div className="home-tes-picture t-flex t-md-10 t-justify-left" />
                                <div className="home-tes-dts t-flex t-flex-column t-justify-center">
                                    <div className="home-tes-name t-flex t-justify-center"> Adeola Abioye</div>
                                    <span className="home-tes-prof t-flex "> Laywer</span></div>
                            </div>
                        </div>
                        <div className="home-carousel t-flex t-md-05 t-justify-space-between">
                            <div className="home-carousel1 t-flex t-md-10" />
                            <div className="home-carousel2 t-flex t-md-10" />
                            <div className="home-carousel3 t-flex t-md-10" />
                        </div>
                    </div>
                </div>
                </div>
                <div className="home-contact-us-div t-flex t-md-10 t-flex-column ">
                    <div className="home-contact-us-holder t-fullheight t-flex t-md-10 t-flex-column nav-pad-left-right">
                        <div className="contactus t-flex t-center-f t-justify-center"> Everything you need in one place </div>
                        <div className="home-sub-text t-flex t-center-f t-justify-center">
                            Managing your rental property is easier when everything is in one place.
                            Property listings, tenant screening, leasing, rent collection and even maintenance tracking all on one screen.</div>
                        <div className=" t-flex t-justify-center t-md-10"><span className= "home-imgg"></span> </div>
                        <div className="home-sub-text t-flex t-center-f t-justify-center ">All the tools you need, designed specifically
                            for do-it-yourself landlords. With our online landlord software,
                            you can manage your property in just clicks and not hours!</div>
                    </div>
                </div>
                <FooterMain/>
            </div>
        );
    }
}

