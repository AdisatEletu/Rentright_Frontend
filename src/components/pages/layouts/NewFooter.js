/**
 * Created by Adizat on 11/07/2017.
 */
import React, {Component} from 'react';
import Copyright from './footer/Copyright'

function Rows() {

    return (

        <div className="row">
            <AboutUs/>
            <Recent/>
            <Contact/>
            <UsefulLinks/>
        </div>
    );
}

function AboutUs() {
    return (
        <article>
          <div className="col l3 s6">
            <h5 className="rtext">About Us</h5>
            <p className=" text-lighten-4">
                RentRight by AlgorismRentRight by AlgorismRentRight by AlgorismRentRight by Algorism
                RentRight by AlgorismRentRight
            </p>
            <hr />
            <a href="#">Read More . . .</a>
         </div>
        </article>
    );
}
function Recent (){

    return (

        <article>
        <div className="col l3 s6">
            <h5 className="rtext">Recent Properties</h5>
                <property1/>
                <property2/>

          </div>
        </article>

    ); }

function property1() {
    return (
        <div className="property small">
            <a href="#"><div className="property-image"><img src="CSS/img/housed.jpg" alt="Property" /></div></a>
            <div className="property-info">
                <h6> House 5,A close 722rd </h6>
                <figure>Festac, Lagos.</figure>
                <div className="tag price"># 120, 000 </div>
            </div>
        </div>
    );

}

function property2 () {
    return(
        <div className="property small">
            <a href="#"><div className="property-image"><img src="CSS/img/housed.jpg" alt="Property" /></div></a>
            <div className="property-info">
                <h6> House 5,A close 722rd </h6>
                <figure>Festac, Lagos.</figure>
                <div className="tag price"># 120, 000 </div>
            </div>
        </div>
    );

}
function Contact() {
    return (
<article>
    <div className="col l3 s6">
        <h5 className="rtext">Contact</h5>
        <p className=" text-lighten-4"><strong>Algorism Nig</strong><br /></p>
        <p className=" text-lighten-4"> 74 Raymond Njoku<br />
            Off Awolowo Road, Ikoyi.</p>
            +(234) 808-231-5489<br />
        <a href="#.com">contactus@rentright.com</a>
    </div>
</article>
    );
}

function UsefulLinks() {

    return (
        <article>
        <div className="col l3  s6">
            <h5 className="rtext">Useful Links</h5>
            <ul>
                <li><a className=" text-lighten-3" href="#!">All Properties</a></li>
                <li><a className=" text-lighten-3" href="#!">Privacy Policy</a></li>
                <li><a className=" text-lighten-3" href="#!">Login and Register Account</a></li>
                <li><a className=" text-lighten-3" href="#!">FAQ</a></li>
                <li><a className=" text-lighten-3" href="#!">Terms and Conditions</a></li>
            </ul>
        </div>
        </article>
    );
}

export default class  NewFooter extends Component {

    render() {

        return (
            <footer className="page-footer">
                <div className="inner-footer">
                    <div className="main-footer">
                         <div className="container">
                              <div className="row">
                                   <Rows/>

                              </div>
                         </div>
                        <Copyright/>
                    </div>
                </div>
            </footer>
        );
    }
}