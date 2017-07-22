import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import appRoot from 'app-root-path';

function Contact(){
    return (
        <div className="contact">
            <figure><strong>Phone:</strong>+234 808 231 5489</figure>
            <figure><strong>Email:</strong>info@rentright.com</figure>
        </div>
    );
}

class UserArea extends Component{
    logout(){
        this.props.logout();
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        const guestLinks = (
            <div>
                <Link to="/register"  className="promoted">Register</Link>
                <Link to="/sign-in">Sign In</Link>
            </div>
        );

        const {first_name, last_name} = this.props.auth.user;

        const userLinks = (
            <div>
                <Link to="/landlord/profile" className="promoted">{first_name} {last_name}</Link>
                <Link to="/sign-in" onClick={this.logout.bind(this)}>Log Out</Link>
            </div>
        );

        return (
            <div className="user-area">
                <div className="actions">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
                <div className="language-bar">
                    <a href="#.com" className="active"><img src="http://localhost:3000/assets/img/flags/gb.png" alt=""/></a>
                    <a href="#.com"><img src="http://localhost:3000/assets/img/flags/de.png" alt=""/></a>
                    <a href="#.com"><img src="http://localhost:3000/assets/img/flags/es.png" alt=""/></a>
                </div>
            </div>
        );
    }
}

export default class SecondaryNav extends Component{

    render(){
        const {auth,logout} = this.props;

        return(
            <div className="secondary-navigation">
                <div className="container">
                    <Contact/>
                    <UserArea auth={auth} logout={logout}/>
                </div>

            </div>
        );
    }
}

SecondaryNav.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}