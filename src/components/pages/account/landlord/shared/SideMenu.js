import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SideMenu extends Component{

    constructor(props){
        super(props)
        this.state = {
            active: this.props.active,
        }
    }

    render(){

        const {active} = this.state;

        return(

            <div className="col-md-3 col-sm-2">
                <section id="sidebar">
                    <header><h3>Account</h3></header>
                    <aside>
                        <ul className="sidebar-navigation">
                            <li className={active==="profile" ? "active" : ""}><Link to="/landlord/profile"><i className="fa fa-user" /><span>Profile</span></Link></li>
                            <li className={active==="properties" ? "active" : ""}><Link to="/landlord/properties"><i className="fa fa-home" /><span>My Properties</span></Link></li>
                            <li className={active==="bookmark" ? "active" : ""}><Link to="/landlord/bookmarked"><i className="fa fa-heart" /><span>Bookmarked Properties</span></Link></li>
                            <li className={active==="reviews" ? "active" : ""}><Link to="/landlord/my-reviews"><i className="fa fa-star" /><span>My Reviews</span></Link></li>
                            <li className={active==="settings" ? "active" : ""}><Link to="/landlord/settings"><i className="fa fa-gear" /><span>Account Settings</span></Link></li>
                        </ul>
                    </aside>
                </section>
            </div>
        );
    }
}

SideMenu.propTypes = {
    active: PropTypes.string.isRequired
}