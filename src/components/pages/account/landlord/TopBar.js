import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Dropdown, NavItem} from 'react-materialize';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../../state/actions/authAction';
import {Avatar, Icon, Badge} from 'antd';
import Notifications from "../../layouts/account/Notifications";

class TopBar extends Component {

    logout() {
        console.log(this.props);
        this.props.logout();
    }

    render() {
        const {header} = this.props;

        return (
            <div className="section no-pad-bot" id="index-banner">
                <div className="d-container">
                    <div className="row full-width">
                        <div className="col s8">
                            <h3 className="d-header d-header-tag" style={{marginTop: 0, marginBottom: 0}}>
                                {!header.isSet ? undefined : header.text}
                            </h3>
                        </div>
                        <div className="col s4">
                            <span className="right">
                                <Dropdown trigger={
                                    <Avatar size="large" icon="user"/>
                                } options={{
                                    inDuration: 300,
                                    outDuration: 225,
                                    constrainWidth: false, // Does not change width of dropdown to that of the activator
                                    hover: true, // Activate on hover
                                    gutter: 10, // Spacing from edge
                                    belowOrigin: true, // Displays dropdown below the button
                                    alignment: 'left', // Displays dropdown with edge aligned to the left of button
                                    stopPropagation: false // Stops event propagation
                                }}>
                                <NavItem>
                                    <div className="row">
                                        <div className="col s8">
                                            <span
                                                className="big-text primary-color-text"><b>Odaibo Amadosi</b></span> <br/> <span
                                            className="tertiary-color-text">Odaiboamadosi@gmail.com</span>
                                        </div>
                                        <div className="col s4">
                                            <i className="blue-grey-text lighten-2 fa fa-times right"/>
                                        </div>
                                    </div>
                                </NavItem>
                                <NavItem divider/>

                                <NavItem href="landlord/subscriptions">
                                    <span className="big-text blue-grey-text lighten-2">Subscription plan</span>  <br/> <span
                                    className="tertiary-color-text">Beginner (Free)</span>
                                </NavItem>
                                <NavItem href="/landlord/account_settings"><span
                                    className="big-text blue-grey-text lighten-2">Account Settings</span></NavItem>
                                <NavItem href="landlord/subscriptions"><span
                                    className="big-text blue-grey-text lighten-2">Bank Accounts</span></NavItem>
                                <NavItem divider/>
                                <NavItem onClick={this.logout.bind(this)}><span className="big-text  red-text darken-4">Log Out</span></NavItem>
                            </Dropdown>
                            </span>
                            <span className="right" style={{marginRight: '25px', marginTop: '5px'}}>
                                <Notifications/>
                            </span>
                        </div>
                    </div>

                    {/*{header.hasBar ? <Tab uuid={header.uuid}/> : ''}*/}

                </div>
            </div>
        );
    }

}

function Tab(props) {
    return (

        <div className="cont">
            <ul className="d-tabs  primary-nav">
                <li className="tabs__item">
                    <NavLink exact to={'/landlord/units/' + props.uuid + '/'} activeClassName="active"
                             className={"tabs__link"}><i className="fa fa-home"/></NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/' + props.uuid + '/listing'}
                             className={"tabs__link"}>Listing</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/' + props.uuid + '/applications'} className={"tabs__link"}>Applications</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/' + props.uuid + '/lease'} className={"tabs__link"}>Leases</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/' + props.uuid + '/payments'}
                             className={"tabs__link"}>Payments</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/' + props.uuid + '/maintenance'}
                             className={"tabs__link"}>Maintenance</NavLink>
                </li>
            </ul>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        header: state.ui.header,
    }
}

TopBar.propTypes = {
    header: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {logout})(TopBar);

