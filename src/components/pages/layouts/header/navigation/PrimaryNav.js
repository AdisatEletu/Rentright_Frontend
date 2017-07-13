import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function Header(){
    return (
        <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
            </button>
            <div className="navbar-brand nav" id="brand">
                <a href="index-google-map-fullscreen.html"><h3><b>RentRight</b></h3></a>
            </div>
        </div>
    );
}

function Nav(){
    return(
        <nav className="collapse navbar-collapse bs-navbar-collapse navbar-right">
            <ul className="nav navbar-nav">
                <li className="active has-child"><Link  to={"/"}>Homepage</Link></li>
                <li><a href="#.com">Landlords</a></li>
                <li><a href="#.com">Tenants</a></li>
                <li><a href="#.com">Agents & Agencies</a></li>
                <li><a href="#.com">Blog</a></li>
                <li><a href="#.com">Contact</a></li>
            </ul>
        </nav>
    );
}

function AddProperty(){
    return (

        <div className="add-your-property">
            <a href="submit.html" className="btn btn-default"><i className="fa fa-plus" /><span className="text">Add Your Property</span></a>
        </div>
    );
}

export default class PrimaryNav extends Component{

    render(){
        return(
            <div className="container">
                <header className="navbar" id="top" role="banner">
                    <Header/>
                    <Nav/>
                    <AddProperty/>
                </header>
            </div>
        );
    }
}

PrimaryNav.propTypes = {
    //auth: PropTypes.object.isRequired,
}