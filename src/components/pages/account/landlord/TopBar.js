import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Dropdown,NavItem} from 'react-materialize';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../../state/actions/authAction';

class TopBar extends Component {

    logout(){
        console.log(this.props);
        this.props.logout();
    }

    render(){
        const {header} = this.props;

        return(
            <div className="section no-pad-bot" id="index-banner">
                <div className="d-container">
                    <div className="row full-width">
                        <div className="col s8">
                            <h3 className="d-header d-header-tag" style={{marginTop:0, marginBottom:0}}>
                                {!header.isSet ? <i className="fa fa-circle-o-notch fa-spin"/> : header.text}
                                </h3>
                        </div>
                        <div className="col s4">
                            <span className="right">
                            <Dropdown trigger={
                                <a className="dropdown-button right" href="#!" data-activates="account_dropdown" data-beloworigin="true">
                                    <img className="circle responsive-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABeCAMAAAAAAVrUAAAAOVBMVEWZmZn///+cnJyVlZWSkpKPj4/n5+f8/Pzd3d3t7e3Ly8v09PTIyMi+vr7a2tqjo6OysrLU1NSsrKxvsqY5AAACtklEQVRogc2Z65arIAyFUwHxWtD3f9ijiKszXZJsBc6a/bv6NQkJSaTXHdl28q6hZl3uPEU3ftt6pRUFadfXYLTuBAQp39nCDOsN/ZbShua2IKMnRRdSxgEUjNFdEo7ITGUY3bef7kEQRs8hNsg7n2EbFrFJOGAAY04HIxoy5DJ6LZlBay5DNIPI5DL4gBdhdLKryPBBFxmAq8iMeQwnI3IZcnLsDL7QS4wRQOQyeiAcuYwWOFak+QL/FxhIepDiK28ZBn+FFGEQsQlShsFfU3+BAZ0r0l19hmKTsAyjYd9RpJaoOYthETNMXp5DdxTvKplhZQZ/qpCeQcwQ5YU3AD3cKtkhzSEAY+ENkTyF9dR82IWAg4wXGw0+N2DGwBgiTgYgg2urlTx5Qgwm2QFXgfNg+vhqYE7HGEPSWQ54GmOMqaAjrkLn8ykBUcjiBN0BJJwlJznOSE1T6n8wCvoqORUKI+0dRrIsqlI7mUkzBUuGAIzRsReI8fl3VM8BgrukmIgMYJUhQSSGcNEe0jk9XMeH4gNhhxyGMQ4NRtghXOATDNsPq0Fa3VNKr0tqmLpi9ItvuIxI2UL+unp9MWw7eFLqPiAaQ9OFMT8Y43t25sH//40x6/s7NCdjnJzKfX+U/l5fR4Z96p5LKd389FlkpO7SDMz0zShM2PX5fHEwhE30Q513C9Vx1aG4yzwYyNLwgWL3FRjQQu+Jmg8DG/Qf6Ng/UMVwnB13YPhKCNLLybCVQk6x/doZY5XsCApb2Z0B7vOeKOwHdgayEnkqExkVEWF4oFrFKmpfy26MpaYd+8miuuEI5YSqFcRT48aoVhAP6XZjVCuIkbFsDKhrfq7tDqHKISfyG6NyyMm9CFrgZslSxaJ7SI9UsegeMj1xe7wi0m+aKyNIDVT7WG0JQsj32Dx5aqrL/QPfGxyOstzMIAAAAABJRU5ErkJggg=="
                                         alt="RentRight" style={{width: '40px', height: '40px'}}/>
                                </a>
                            } options={{
                                inDuration: 300,
                                outDuration: 225,
                                constrainWidth: false, // Does not change width of dropdown to that of the activator
                                hover: true, // Activate on hover
                                gutter: 10, // Spacing from edge
                                belowOrigin: false, // Displays dropdown below the button
                                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                                stopPropagation: false // Stops event propagation
                            }}>
                                <NavItem>
                                    <div className="row">
                                        <div className="col s8">
                                            <span className="big-text primary-color-text"><b>Odaibo Amadosi</b></span> <br/> <span className="tertiary-color-text">Odaiboamadosi@gmail.com</span>
                                        </div>
                                        <div className="col s4">
                                            <i className="blue-grey-text lighten-2 fa fa-times right"/>
                                        </div>
                                    </div>
                                </NavItem>
                                <NavItem divider />

                                <NavItem href="landlord/subscriptions">
                                    <span className="big-text blue-grey-text lighten-2">Subscription plan</span>  <br/> <span className="tertiary-color-text">Beginner (Free)</span>
                                </NavItem>
                                <NavItem href="/landlord/account_settings"><span className="big-text blue-grey-text lighten-2">Account Settings</span></NavItem>
                                <NavItem href="landlord/subscriptions"><span className="big-text blue-grey-text lighten-2">Bank Accounts</span></NavItem>
                                <NavItem divider />
                                <NavItem onClick={this.logout.bind(this)}><span className="big-text  red-text darken-4">Log Out</span></NavItem>
                            </Dropdown>
                            </span>
                        </div>
                    </div>

                    {/*{header.hasBar ? <Tab uuid={header.uuid}/> : ''}*/}

                </div>
            </div>
        );
    }

}

function Tab(props){
    return (

        <div className="cont" >
            <ul className="d-tabs  primary-nav">
                <li className="tabs__item">
                    <NavLink exact to={'/landlord/units/'+props.uuid+'/'} activeClassName="active" className={"tabs__link"}><i className="fa fa-home"/></NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/'+props.uuid+'/listing'} className={"tabs__link"}>Listing</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/'+props.uuid+'/applications'} className={"tabs__link"}>Applications</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/'+props.uuid+'/lease'} className={"tabs__link"}>Leases</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/'+props.uuid+'/payments'} className={"tabs__link"}>Payments</NavLink>
                </li>
                <li className="tabs__item">
                    <NavLink to={'/landlord/units/'+props.uuid+'/maintenance'} className={"tabs__link"}>Maintenance</NavLink>
                </li>
            </ul>
        </div>
    );
}

function mapStateToProps(state){
    return{
        header: state.ui.header,
    }
}

TopBar.propTypes = {
    header: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{logout})(TopBar);

