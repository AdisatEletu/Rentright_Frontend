import React, {Component} from 'react';

export default class FooterMain extends Component {

    render() {

        return (
            <div>
                <div className="home-footer t-flex t-md-10 ">
                    <div className="footer-items-holder t-md-10 t-fullheight t-flex nav-pad-left-right t-justify-space-between">
                        <div className=" t-flex-column t-md-22">
                        <div className=" t-flex t-md-10 t-flex-column footer-text ">
                            <div className="rentright-logo t-flex t-md-10" />
                            <div className="home-rentright-about t-flex t-left-f t-md-10"> RentRight is a platform for everybody involved in property-renting business
                                landlords, tenants, agents, arbitrators, preventing issues and saving time.</div>
                            <div className="home-footer-social t-flex t-md-10 ">
                                <span><i className="fa fa-twitter home-twit t-flex t-md-3" /></span>
                                <span><i className="fa fa-facebook home-twit t-flex t-md-3 " /></span>
                                <span><i className="fa fa-linkedin home-twit t-flex t-md-3" /></span>
                            </div>
                        </div>

                        </div>
                        <div className="t-flex t-md-22 t-flex-column  t-align-content-center ">
                            <span className="most-commented t-flex t-md-10 "> Most Commented</span>
                            <div className="footer-img-holder t-flex t-md-10  ">
                                <div className="footer-img1 t-flex"> </div>
                                <div className=" t-flex t-flex-column footer-img1-details t-justify-center ">
                                    <div className="home-new-post">New Post with image </div>
                                    <span className="home-tes-prof ">March 13, 2017</span></div>
                            </div>
                            <div className="footer-img-holder t-flex t-md-10  ">
                                <div className="footer-img2 t-flex"> </div>
                                <div className=" t-flex footer-img2-details t-flex-column  ">
                                    <div className="home-new-post t-justify-center">Video Post </div>
                                    <span className="home-tes-prof ">March 13, 2017</span></div>
                            </div>
                        </div>


                        <div className="home-useful-links t-flex t-md-22  t-flex-column">
                            <div className="t-flex t-justify-space-between t-flex-column">
                                <div className="most-commented t-flex t-md-10 ">Useful Links</div>
                                <div className="home-first-link t-flex"> <i className="material-icons">arrow_forward</i> <span className="footer-a">For Landlord</span></div>
                                <div className="footer-hr" />
                                <div className="home-first-link t-flex"> <i className="material-icons">arrow_forward</i><span className="footer-a">For Tenant</span></div>
                                <div className="footer-hr" />
                                <div className="home-first-link t-flex"> <i className="material-icons">arrow_forward</i> <span className="footer-a">Landlord </span></div>
                                <div className="footer-hr" />
                                <div className="home-first-link t-flex"> <i className="material-icons">arrow_forward</i><span className="footer-a"> Landlord</span></div>
                                <div className="footer-hr" />
                            </div>
                        </div>


                        <div className="most-commented t-flex t-md-22 ">Twitter Feeds</div>
                    </div>
                </div>
                <div className="footer-copyright home-primary-color t-md-10 t-justify-space-between t-align-center t-flex-column ">
                    <div className="t-flex t-flex nav-pad-left-right  ">
                        <div className="copyright t-flex t-md-5">RentRight © 2017. All Rights Reserved. <div className="copyright-a t-flex home-secondary-color-f">Terms Of Use</div> and <div className="copyright-a t-flex home-secondary-color-f"> Privacy Policy</div></div>
                        <div className="copyright-top t-flex t-md-5  t-justify-right">Top.</div>
                    </div>
                </div>
            </div>
        );
    }
}