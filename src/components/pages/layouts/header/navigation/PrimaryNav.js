/**
 * Created by Adizat on 10/07/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';

 class PrimaryNav extends Component{
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
                    <span className="home-breadcrumbs">{this.props.auth.user? null : <Link to="/Register"><i className="fa fa-user-plus" /> <span>Register</span></Link>}</span>
                    {this.props.auth.user ?
                        <span className="home-breadcrumbs">Welcome,{" "}{this.props.auth.user.last_name} <a href="#"><i className="fa fa-user home-icons" /></a></span>
                        :
                        null
                    }
                    <span className="home-breadcrumbs home-active"><i className="fa fa-sign-out" />
                        {this.props.auth.user ?  <a href="/sign-out" style={{color: '#ffffff'}}> Logout</a> :<a href="/sign-in" style={{color: '#ffffff'}}> Login</a>}


                        </span>
                </div>
            </div>
        );
    }
}

function matchStateToProps(state){
    return {
        auth:state.user.auth
    }
}

export default connect(matchStateToProps,{})(PrimaryNav)