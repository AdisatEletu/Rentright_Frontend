import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EditorBar extends Component {

    render() {
        const {active,uuid} = this.props;

        return (
            <div className="cont" >
                <div className="header_address">No 17 Omorinre johnson street.</div>
                <ul className="tabs  primary-nav">
                    <li className="tabs__item">
                        <Link to={'/landlord/properties/'+uuid+'/'} className={active === 'home' ? "active tabs__link": "tabs__link"}><i className="fa fa-home"/></Link>
                    </li>
                    <li className="tabs__item">
                        <Link to={'/landlord/properties/'+uuid+'/listing'} className={active === 'listing' ? "active tabs__link": "tabs__link"}>Listing</Link>
                    </li>
                    <li className="tabs__item">
                        <Link to={'/landlord/properties/'+uuid+'/applications'} className={active === 'application' ? "active tabs__link": "tabs__link"}>Applications</Link>
                    </li>
                    <li className="tabs__item">
                        <Link to={'/landlord/properties/'+uuid+'/lease'} className={active === 'lease' ? "active tabs__link": "tabs__link"}>Leases</Link>
                    </li>
                    <li className="tabs__item">
                        <Link to={'/landlord/properties/'+uuid+'/payments'} className={active === 'payments' ? "active tabs__link": "tabs__link"}>Payments</Link>
                    </li>
                    <li className="tabs__item">
                        <Link to={'/landlord/properties/'+uuid+'/maintenance'} className={active === 'maintenance' ? "active tabs__link": "tabs__link"}>Maintenance</Link>
                    </li>
                </ul>
            </div>
        );
    }

}

export default EditorBar;

