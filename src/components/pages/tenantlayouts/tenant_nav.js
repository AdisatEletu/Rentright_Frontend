import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

 class TenantNav extends Component{
    constructor(props){
        super(props)
            }
        render (){
return (
   <div className = "m-nav-container t-nav">
     <div className = "m-primary-nav  ">
          <span className = "t-sup-h3 thin">Rent-Right by Algorism LTD </span>
        
        <div className = "m-profile-info">
        <i className ="material-icons tiny">list</i>
         <span>{this.props.first_name}</span>
         <span>Log out</span>
         <span>Switch</span>        
        <div className = "t-rounded m-prf2 t-white t-cover m-me"   style =   { !this.props.myProfile.tenants.tenant_bio.profile_picture ? {backgroundImage:'url('+this.props.fileToServer.content+')'} : {backgroundImage:'url('+this.props.myProfile.tenants.tenant_bio.profile_picture+')'}}>  
             <div className = "m-cover t-flex t-align-center t-fullheight t-fullwidth t-justify-center"> <i className = "material-icons  md-12 right">linked_camera</i> </div>           
          </div>
     </div>
     </div>
	      <div className = "m-links">
         <div className = "div t-flex t-align-center  t-justify-center t-justify-space-between  t-align-baseline">
             <i className = "material-icons small">view_quilt</i>
             <i className = "material-icons small">business</i>
              <i className = "material-icons small">location_on</i>
               <i className = "material-icons small">person_pin</i>
         </div>
         <div className = "m-search">
             <div className = "m-btn"><i className = "fa fa-search"></i></div>
        
             </div>
 
     </div>
    </div>     
         
        );//return

        }//render
        
    
 }
  TenantNav.PropTypes = {



}
export default TenantNav;