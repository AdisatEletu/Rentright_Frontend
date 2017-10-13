import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../../state/actions/authAction';
import {Avatar, Icon, Badge} from 'antd';
import Notifications from "../../layouts/account/Notifications";
import DropDown, {Item} from "../../../shared/DropDown";

class TopBar extends Component {

    logout(e) {
        e.preventDefault();

        this.props.logout(()=>{
            this.context.router.history.replace('/');
        });
    }

    render() {
        const {header} = this.props;
        const dropDownHeader = <div style={{marginBottom: '0'}} className={'row'}>
            <div className={'col s2'}>
                <Avatar size="large" icon="user"/>
            </div>
            <div className={'col s10'}>
                <span style={{
                    display: 'block',
                    fontSize: '18px'
                }}><b>{this.props.user.first_name} {this.props.user.last_name}</b></span>
                {this.props.user.email}
            </div>
        </div>;

        const dropDownFooter = <div style={{marginBottom: '0'}} className={'row account-dropdown'}>
            <div className={'col s4 center'}>
                <NavLink className={'profile grey-text'} to={'/landlord/profile'}>
                    <span style={{fontSize: '30px'}}><i className={'fa fa-user'}/></span>
                    Profile
                </NavLink>
            </div>
            <div className={'col s4 center'}>
                <NavLink className={'settings grey-text'} to={'/landlord/settings'}>
                    <span style={{fontSize: '30px'}}><i className={'fa fa-cog'}/></span>
                    Settings
                </NavLink>
            </div>
            <div className={'col s4 center'}>
                <a className={'red-text darken-2'} href={'/logout'} onClick={this.logout.bind(this)}>
                    <span style={{fontSize: '30px'}}><i className={'fa fa-power-off'}/></span>
                    Logout
                </a>
            </div>
        </div>;

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
                                <DropDown
                                    options={{
                                        trigger: <Avatar size="large" icon="user"/>,
                                        header: dropDownHeader,
                                        footer: dropDownFooter,
                                    }}>
                                    <Item to={'/landlord/subscription'}>
                                        <NavLink to={'/landlord/subscription'}>{'Subscription Plans'}</NavLink>
                                    </Item>
                                    <Item to={'/landlord/bank_accounts'}>
                                        <NavLink to={'/landlord/bank_accounts'}>{'Bank Account'}</NavLink>
                                    </Item>
                                    <Item to={'/landlord/referral'}>
                                        <NavLink to={'/landlord/referral'}>{'Refer a Friend'}</NavLink>
                                    </Item>
                                </DropDown>
                            </span>
                            <span className="right" style={{marginRight: '25px', marginTop: '5px'}}>
                                {/*<Notifications/>*/}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        header: state.ui.header,
        user: state.user.auth.user
    }
}

TopBar.propTypes = {
    header: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
}

TopBar.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, {logout})(TopBar);

