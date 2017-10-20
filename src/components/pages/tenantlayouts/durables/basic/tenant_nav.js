import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Dropdown from '../layout_elements/dropdown';
import { Badge } from 'antd';
import {Icon} from 'antd';
import { Avatar } from 'antd';

 class TenantNav extends Component{
    constructor(props){
        super(props)
            }
        render (){
return (
   <div className = "t-nav">
     <div className = "p-nav-container">
     <div className = "p-signature">Rent-Right</div>  
     <div className = "curved t-flex t-justify-left t-flex-row p-curved-serach ">
       <Icon style = {{color:'rgba(255,255,255,0.2)', fontSize:'20px', lineHeight:'35px', marginRight:'20px'}} type = "search"/><input type = "text" placeholder = "Search ..."/>
       </div>      
        <div className = "p-links-hold t-justify-right">       
        <div className = "p-package t-flex t-justify-left">
         <div className ="curved-white">Invite A Friend</div>
          <Dropdown 
              flowClass = "p-links"
              linkClass = {<span>Notifications...</span>}
              dropdownHeader = "Notifications"
              dropdownChild = {<div className = "list-elements"></div>}
          />

        <span className = "p-links"><Badge count={5}> <i className = "material-icons small">cloud_queue</i> </Badge></span>
         <span className = "p-links"> <NavLink to = "/account">Switch Account</NavLink></span>  
         <span className = "p-links">Log out</span> 

        <div className = "t-flex t-ful-height t-align-center  t-justify-right t-align-content-center p-right">
         <Dropdown 
          flowClass = "p-links p-name" 
          linkClass ={this.props.first_name +' '+this.props.last_name  }
          dropdownHeader = "Account Settings"
          dropdownChild = {<div className = "list-elements"></div>}
          icon = "setting"
          />
        
        <div className = "pp-thumbnail"    
          style = {   this.props.myProfile.tenants.tenant_bio ?
            { backgroundImage:"url("+this.props.myProfile.tenants.tenant_bio.profile_picture+")",
              backgroundSize:'cover',backgroundReapet:'no-repeat'            
            } :  null } >  
         
          </div>
         
        </div>
        </div>
   
 

     </div>
     </div>
	      <div className = "p-subnav">
          <li className = "ppselected"><Icon style = {{marginRight:'10px'}} type = "user"/><span>Profile</span></li>
          <li><Icon style = {{marginRight:'10px'}}  type = "team"/><span>Public Profile</span></li>
          <li><Icon style = {{marginRight:'10px'}}  type = "shop"/><span>Find Listings</span></li>
          <li><Icon  style = {{marginRight:'10px'}} type = "global"/><span>Applications</span></li>
          <li><Icon  style = {{marginRight:'10px'}} type = "bank"/><span>Bank Account Settings</span></li>
           <li><Icon style = {{marginRight:'10px'}}  type = "settings"/><span>Privacy Settings</span></li>
         </div>   
        </div>  
         
        );//return

        }//render
        
    
 }
  TenantNav.PropTypes = {



}
export default TenantNav;