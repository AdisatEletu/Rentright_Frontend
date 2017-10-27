import React, {Component} from 'react';

export default class FooterMain extends Component {

    render() {

        return (
            <div className="t-flex t-flex-column home-footer1">
                <div className="footer-content  t-md-10 t-flex t-align-center">
                    <div className="footer-content-items t-fullheight t-md-10 t-flex t-justify-space-between nav-pad-left-right">
                        <div className="footer-item1 t-fullheight t-md-22 ">
                            <div className=" t-flex t-md-10 t-flex-column  t-justify-space-between ">
                                <div className="rentright-logo t-flex t-md-10" />
                                <div className="t-flex t-flex-column hhhhhh t-align-content-space-between t-md-10">
                                    <div className="home-rentright-about t-flex t-left-f t-md-10 hhhhhh"> RentRight is a platform for everybody involved in property-renting business
                                        landlords, tenants, agents, arbitrators, preventing issues and saving time.</div>
                                    <div className="home-footer-social t-flex t-md-10 t-justify-space-between hhh">
                                        <span><i className="fa fa-twitter home-twit t-flex t-md-1" /></span>
                                        <span><i className="fa fa-facebook home-twit t-flex t-md-1 " /></span>
                                        <span><i className="fa fa-linkedin home-twit t-flex t-md-1" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-item1 t-fullheight t-md-22 ">
                            <span className=" t-flex t-md-10 most-commented "> Most Commented</span>

                            <div className="t-md-10 t-flex hhhh t-justify-space-between t-flex-column">
                                <div className="footer-img-holder t-flex t-md-10 t-justify-space-between ">
                                    <div className="footer-img1 t-flex"> </div>
                                    <div className=" t-flex footer-img2-details t-flex-column t-md-5 ">
                                        <div className="home-new-post t-justify-center">Image Post </div>
                                        <span className="home-tes-prof ">March 13, 2017</span></div>
                                </div>
                                <div className="footer-img-holder t-flex t-md-10 t-justify-space-between ">
                                    <div className="footer-img2 t-flex"> </div>
                                    <div className=" t-flex footer-img2-details t-flex-column t-md-5  ">
                                        <div className="home-new-post t-justify-center">Video Post </div>
                                        <span className="home-tes-prof ">March 13, 2017</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-item1 t-fullheight t-md-22 ">
                            <div className="most-commented t-flex t-md-10 ">Useful Links</div>

                            <div className="footer-hr" />
                            <div className="home-first-link t-flex t-justify-space-between"> <i className="material-icons t-md-1">arrow_forward</i> <span className="footer-a t-md-85">For Landlord</span></div>
                            <div className="footer-hr" />
                            <div className="home-first-link t-flex t-justify-space-between"> <i className="material-icons t-md-1">arrow_forward</i><span className="footer-a t-md-85">For Tenant</span></div>
                            <div className="footer-hr" />
                            <div className="home-first-link t-flex t-justify-space-between"> <i className="material-icons t-md-1">arrow_forward</i> <span className="footer-a t-md-85">Landlord </span></div>
                            <div className="footer-hr" />
                            <div className="home-first-link t-flex t-justify-space-between"> <i className="material-icons t-md-1">arrow_forward</i><span className="footer-a t-md-85"> Landlord</span></div>
                            <div className="footer-hr" />

                        </div>

                        <div className="footer-item1 t-fullheight t-md-22 ">
                            <div className="most-commented t-flex t-md-5 ">Twitter Feeds</div>
                        </div>

                    </div>
                </div>







                <div className="footer-copyright home-primary-color t-md-10 t-justify-space-between t-align-center t-flex-column ">
                    <div className="t-flex t-flex nav-pad-left-right  ">
                        <div className="copyright t-flex t-md-8">RentRight © 2017. All Rights Reserved. <div className="copyright-a t-flex home-secondary-color-f">Terms Of Use</div> and <div className="copyright-a t-flex home-secondary-color-f"> Privacy Policy</div></div>
                        <div className="copyright-top t-flex t-md-2  t-justify-right">Top.</div>
                    </div>
                </div>


            </div>
        );
    }
}