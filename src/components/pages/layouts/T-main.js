import React, {Component} from 'react';
import Navigation from './header/Navigation';

export default class Header extends Component{

    render(){
        return(
         <div className = "t-midmain">
        <div className = "t-flex t-flex-row t-md-10 t-justify-space-between">
            <div className = "t-md-2 t-flex t-justify-space-between t-flex-row t-align-center">
            <span className = "t-sup-h3 semi-thin lato t-gray-darken-2-f  m-ellipses t-space-1">Tenant Profile</span>
            <i className = "fa fa-search t-h3 t-gray-lighten-1-f"></i>
            </div>
        <div className = "t-md-2 t-flex t-justify-space-between t-flex-row t-align-center">
            <span className = "t-h4  t-gray-darken-3-f  mid m-ellipses t-space-1 t-uppercase">Recent&nbsp;<i className = "fa fa-angle-down"></i></span>
            <div className = "m-round-btn">ADD PROFILE  &nbsp;<i className = "fa fa-angle-down"></i></div>
            </div>            
        </div>
      
        <div className = "t-flex t-flex-row t-m-10 t-justify-space-between m-padbox t-align-baseline">
            <div className = "t-gray-darken-3-f semithin t-h2  "><span className = "m-pad-right">Please update your profile</span>
            <span className = "t-gray-darken-1-f thin t-h3 t-lh-h2 ">You can quickly add missing profile information here</span>
            </div>
            
            <div className ="m-plus-btn"><i className = "fa fa-plus"></i></div>
            </div>

    </div>
        );
    }
}