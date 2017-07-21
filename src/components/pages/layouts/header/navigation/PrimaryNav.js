/**
 * Created by Adizat on 10/07/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import PropTypes from 'prop-types';

function Drop(){
    return (
        <div >
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">Police</a></li>
                <li><a href="#!">Courts</a></li>
                <li><a href="#!">Agencies</a></li>
                <li><a href="#!">Estate Managers</a></li>
                <li><a href="#!">Financial Institutions</a></li>
                <li className="divider"/>
                <li><a href="#!">Government</a></li>
            </ul>

            <ul id="dropdown2" className="dropdown-content">
                <li><a href="#!">Agents</a></li>
                <li><a href="#!">Arbitrators</a></li>
                <li><a href="#!">Handy Men</a></li>

                <li className="divider"/>
                <li><a href="#!">Estate Managers</a></li>
            </ul>
        </div>
    );
}

function Header(){
    return (

        <div className="navbar-fixed">

            <nav className = " topbar " >
                <div className="nav-wrapper row">
                    <div className = " col s8 col m8 offset-s2">
                        <a href="#!" className="brand-logo icon">
                            <div className= "iconic">
                            </div></a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to= {"/LandlordInfo"}>Landlord </Link></li>
                            <li><Link to={"/TenantInfo"}>Tenant </Link></li>
                            <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Institutions<i className="material-icons md-24 right">arrow_drop_down</i></a></li>
                            <li><a className="dropdown-button" href="#!" data-activates="dropdown2">Professionals<i className="material-icons  md-24 right">arrow_drop_down</i></a></li>
                            <li><i className="material-icons  md-24 self-orange ">supervisor_account</i></li>
                            <li><Link to ={"/ContinueAs"}>Sign in</Link></li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>

    );
}


export default class PrimaryNav extends Component{

    render(){
        return(
            <div>
                <Drop/>
                <Header/>
            </div>
        );
    }
}

