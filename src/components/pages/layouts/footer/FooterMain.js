import React, {Component} from 'react';

function Rows(props) {

    return (

        <div className="row">
            <AboutUs/>
            <Recent recents={props.recents}/>
            <Contact/>
            <UsefulLinks/>
        </div>
    );
}

function AboutUs() {
    return (
        <div className="col-md-3 col-sm-3">
            <article>
                <h3>About Us</h3>
                <p>Rent Right is a platform that eliminates friction between tenants and landlords. The
                    platform provides tools that makes the
                    rental process and property management pleasurable and effective.
                </p>
                <hr />
                <a href="#.com" className="link-arrow">Read More</a>
            </article>
        </div>
    );
}
function Recent(props) {

    return (
        <div className="col-md-3 col-sm-3">
            <article>
                <h3>Recent Properties</h3>
                {props.recents.map((recent)=>
                    <div className="property small">
                        <a href="property-detail.html">
                            <div className="property-image">
                                <img alt="" src={recent.img}/>
                            </div>
                        </a>
                        <div className="info">
                            <a href="property-detail.html"><h4>{recent.address}</h4></a>
                            <figure>{recent.location} </figure>
                            <div className="tag price">{recent.price}</div>
                        </div>
                    </div>
                )}

            </article>
        </div>
    );
}

function Contact() {
    return (
        <div className="col-md-3 col-sm-3">
            <article>
                <h3>Contact</h3>
                <address>
                    <strong>Algorism Nig</strong><br />
                    74 Raymond Njoku<br />
                    Off Awolowo Road, Ikoyi.
                </address>
                +(234) 808-231-5489<br />
                <a href="#.com">contactus@rentright.com</a>
            </article>
        </div>
    );
}

function UsefulLinks() {

    return (
        <div className="col-md-3 col-sm-3">
            <article>
                <h3>Useful Links</h3>
                <ul className="list-unstyled list-links">
                    <li><a href="#.com">All Properties</a></li>
                    <li><a href="#.com">Privacy Policy</a></li>
                    <li><a href="#.com">Login and Register Account</a></li>
                    <li><a href="#.com">FAQ</a></li>
                    <li><a href="#.com">Terms and Conditions</a></li>
                </ul>
            </article>
        </div>
    );
}

export default class FooterMain extends Component {

    render() {
        const recent = [
            {
                id: 1,
                img: "http://localhost:3000/assets/img/properties/property-06.jpg",
                price: "$ 71,000",
                address: "2186 Rinehart Road",
                location: "Doral, FL 33178"
            },
            {
                id: 2,
                img: "http://localhost:3000/assets/img/properties/property-09.jpg",
                price: "$ 61,000",
                address: "2479 Murphy Court",
                location: "Minneapolis, MN 55402"
            },
        ];

        return (
            <aside id="footer-main">
                <div className="container">
                    <Rows recents={recent}/>
                </div>
            </aside>
        );
    }
}