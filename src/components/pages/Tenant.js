import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Profile from './account/landlord/Profile';
import T_left from "./layouts/T-left";

import TenantProfile from "./layouts/TenantProfile";
import Advert from "./tenantlayouts/advert";
import GeneralForm from "./layouts/GeneralForm";
import ResidentialForm from "./layouts/ResidentialForm";
import EmploymentForm from "./layouts/EmploymentForm";
import PublicProfile from "./layouts/PublicProfile";
import {NavLink} from 'react-router-dom';
import BioForm from "./layouts/BioForm";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';  
import PropTypes from 'prop-types';
import {getProperty} from "../../state/actions/userActions";
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../state/actions/tenantAction'


class Tenant extends Component{
    uuid;
    constructor(props) {                  
        super(props)
        this.sta
        console.log(this.props) 
       this.uuid = '/'+this.props.match.params.id;
       this.first_name = this.props.auth.user.first_name;
       this.last_name =  this.props.auth.user.last_name;     
    }
    componentDidMount(){        
    try{
       this.uuid = this.props.match.params.id;
  
     }catch(err){
    console.log(err)
}
 

    }
loadprofile = ()=>{
    this.props.loadTenant('/'+this.props.match.params.id);
   } 

    render (){
    return(
 <div className = "t-fullheight t-fullwidth t-white t-flex t-container t-align-stretch t-justify-space-between">
    <div className = "m-nav-container t-nav">
     <div className = "m-primary-nav  ">
          <span className = "t-sup-h3 thin">Rent-Right by Algorism LTD </span>
        
        <div className = "m-profile-info">
        <i className ="material-icons tiny">list</i>
         <span>{this.props.user.first_name}</span>
         <span>Log out</span>
         <span>Switch</span>  
      
        <div className = "t-rounded m-prf2 t-white t-cover m-me">  
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
  
          <div className = "t-left t-gray  t-flex  t-align-content-space-between t-right-bx t-right-bx t-flex-column">
      
          <div className = "t-justify-left t-flex">
            <div className = "t-flex-2 t-contain m-logo ">                
            </div>
         </div>

         <div className = " t-justify-center t-flex">   
 
         <div className = "t-rounded m-prf t-white t-cover m-me">  
             <div className = "m-cover t-flex t-align-center t-fullheight t-fullwidth t-justify-center"> <i className = "material-icons  md-12 right">linked_camera</i> </div>           
          </div>
        
          </div>
 
         <div className = " t-justify-center t-flex t-center-f  t-flex-column t-justify-center m-top-sm ">        
            <span className = "roboto t-h4 t-space-1 mid t-uppercase  m-bluish-f block">{this.props.user.first_name} {this.props.user.last_name}</span>
            <span className = "open-sans t-h5 mid semi-bold t-uppercase m-bluish-f block">{this.props.user.email}</span>
            <div className = "t-center-f  t-gray-lighten-1-f t-flex m-top t-h6  t-justify-center t-md-10"><i className="material-icons">bubble_chart</i></div>
          </div>

<div className = "t-flex t-flex-column m-top-med">
         <NavLink className = "m-nav-li t-md-10" to = "/tenant/profile" activeClassName ="m-active-nav"><i className = "fa fa-user-circle lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">Complete Profile</span> <div className = "t-bullet m-activate">30 %</div> </NavLink>
        <NavLink className = "m-nav-li t-md-10" to = {"/tenant/publicprofile/" + this.first_name +'/' + this.last_name + '/' + this.uuid +'/'}  activeClassName="m-active-nav"><i className = "fa fa-bookmark-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Public Profile</span><div className = "t-bullet"></div> </NavLink>
    <NavLink className = "m-nav-li t-md-10"  to = "/tenant/serviceproviders/:id" activeClassName = "m-active-nav"><i className = "fa fa-handshake-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">Service Providers</span> <div className = "t-bullet"></div> </NavLink>
                        <NavLink className = "m-nav-li t-md-10"  to = "/tenant/messages/:id"  activeClassName = "m-active-nav"><i className = "fa fa-envelope-open-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses ">Messages</span> <div className = "t-bullet"></div> </NavLink>
                            <NavLink className = "m-nav-li t-md-10"  to = "/tenant/propertysearch/:id" activeClassName = "m-active-nav"><i className = "fa fa-building-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses"> Find Properties</span> <div className = "t-bullet m-activate">10 new</div> </NavLink>

</div>

      </div>

 
    <div className = "t-midmain t-flex t-flex-row t-align-stretch">


        <div  className = "t-dash t-flex t-flex-column">
            <Switch>
           <Route  path="/tenant/:id/profile"  component={TenantProfile}/>  
              <Route  path="/tenant/profile/generalinfo/:id"  component={GeneralForm}/>       
              <Route  path="/tenant/profile/bioinfo/:id"  component={BioForm}/>     
              <Route  path="/tenant/profile/residentialinfo/:id"  component={ResidentialForm}/>   
                <Route  path="/tenant/profile/employmentinfo/:id"  component={EmploymentForm}/>    
            <Route  path="/tenant/publicprofile/:first_name/:last_name/:id"  component={PublicProfile}/>  
                </Switch>
          </div>
               
    </div>
<Advert/>
</div>


    );



    }
}

function matchStateToProps(state){
    console.log( state.tenantProfile)
    return   {
        auth:state.user.auth,
       // myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user          
        
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant
  }, dispatch);
}

Tenant.PropTypes = {
    loadSpecificTenant: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    //tenantProfile: PropTypes.object.isRequired
}

export default connect(matchStateToProps,{loadSpecificTenant})(Tenant)

//export default Tenant ;