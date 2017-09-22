/**
 * Created by Adizat on 10/07/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../../../state/actions/authAction';

 class PrimaryNav extends Component{
     logout(e) {
         e.preventDefault();
         this.props.logout();
     }
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        console.log(this.state);
        this.setState(this.props.auth.user)
    }
    componentDidUpdate(prevProps, prevState){
        console.log(this.state);
    }


    render(){

        return(
            <div className="home-firstnav t-fullwidth t-flex t-justify-space-between home-primary-color t-align-center nav-pad-left-right">
                <div className=" t-flex  t-fullheight t-justify-right t-right-f home-firstnav-innerdiv-left ">
                    <span> The Ultimate Insider to the RentRight </span>
                </div>
                <div className="home-firstnav-innerdiv-right t-flex t-justify-center t-flex-row t-center-f t-fullheight ">







                    <span className="home-breadcrumbs">{this.props.auth.isAuthenticated?
                        <div className="acct-holder ">
                            <div className="home-account-switch t-flex t-justify-center ">Account</div>
                            <div className="dropdown-content">
                                <Link to ='/landlord'>Landlord</Link>
                                <Link to ='/tenant'>Tenant</Link>
                                <Link to ='/'>Agent</Link>
                            </div>
                        </div> : <Link to="/Register"><i className="fa fa-user-plus" /> <span>Register</span></Link>}</span>
                    {this.props.auth.isAuthenticated ?
                        <span className="home-breadcrumbs">Welcome,{" "}{this.props.auth.user.last_name} <a href="#"><i className="fa fa-user home-icons" /></a></span>
                        :
                        null
                    }
                    <span className="home-breadcrumbs home-active"><i className="fa fa-sign-out" />
                        {this.props.auth.isAuthenticated ?  <a href="/sign-out" style={{color: '#ffffff'}} onClick={this.logout.bind(this)}> Logout</a> :<a href="/sign-in" style={{color: '#ffffff'}}> Login</a>}


                        </span>
                </div>
            </div>
        );
    }
}


PrimaryNav.propTypes={
     logout: PropTypes.func.isRequired
}

function matchStateToProps(state){
    return {
        auth:state.user.auth
    }
}

export default connect(matchStateToProps,{logout})(PrimaryNav)