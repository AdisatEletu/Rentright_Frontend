import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Profile from './account/landlord/Profile';
import T_left from "./layouts/T-left";

import TenantProfile from "./layouts/TenantProfile";
import GeneralForm from "./layouts/GeneralForm";
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
                <NavLink className = "m-nav-li t-md-10" to = "/tenant/applications/:id"  activeClassName="m-active-nav"><i className = "fa fa-bookmark-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Applications</span><div className = "t-bullet"></div> </NavLink>
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
                </Switch>
          </div>
                <div className = "t-flex t-flex-column t-advert t-flex t-flex-column">
                    <div className = "m-heading">Featured Property</div>
                    <div className = "m-sub">Based on proximity</div>
                    <div className = "t-gray-darken-4-f t-h3 t-flex t-align-center postmid t-capitalize t-space-1 t-md-10 m-ellipses t-capitalize t-justify-left"><i className = "material-icons small t-gray-ligthen-3-f ">dashboard</i>&nbsp;&nbsp;
                    <span>3 Bedroom Apartment</span></div>
                    <div className = "m-advert-img"></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">av_timer</i><span>Uploaded at : 16/07/2017 4:53 PM</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">person_pin</i><span>Odaibo Amadosi</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">credit_card</i><span>Asking Price N800, 000</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">assessment</i><span>Average rate N500, 000</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  m-bl "><i className = "material-icons small">store</i><span>House description&nbsp;&nbsp;<i className = "fa fa-angle-down"></i> </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "fa fa-circle "></i><span>2 bedroom </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid   "><i className = "fa fa-circle "></i><span>2 toilets </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "fa fa-circle "></i><span>Carport  </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  m-bl "><i className = "material-icons small">person_pin</i><span>contact&nbsp;&nbsp;<i className = "fa fa-angle-down"></i> </span></div>
                     <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f mid m-bl  "><i className = "m-contact"></i><span>Felixson Yusuf Tosin</span></div>
                     <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f mid m-bl  "><i className = "m-contact"></i><span>Odaibo Amadosi</span></div>
                     <div className = "m-related">
                         <div className = "m-heading">Related Properties</div>
                          <div className = "m-sub">Based on proximity</div>
                             <div className = "m-item t-flex t-flex-row">
                                 <div className ="t-flex t-md-4   t-justify-center t-align-left open-sans"><div className = "t-md-8 m-shows m-house2"></div></div>
                                 <div className = "t-flex-t-md-6 t-flex   t-gray-lighten-1-f t-flex t-align-center t-align-content-center t-justify-left t-flex-column pd">
                                     <div className ="t-h3 t-gray-darken-1-f m-text-right t-uppercase m-ellipses t-md-10">3 bedroom flats</div>
                                     <div className ="t-h3 semi-thin  m-ellipses t-md-10">Iyana Oworo </div>
                                     <div className ="t-h4 semi-thin  m-ellipses t-md-10">Off Lagos island lagos </div>
                                 </div>
                             </div>
                      <div className = "m-item t-flex t-flex-row">
                                 <div className ="t-flex t-md-4   t-justify-center t-align-left open-sans"><div className = "t-md-8 m-shows m-house3"></div></div>
                                 <div className = "t-flex-t-md-6 t-flex   t-gray-lighten-1-f t-flex t-align-center t-align-content-center t-justify-left t-flex-column pd">
                                     <div className ="t-h3 t-gray-darken-1-f m-text-right t-uppercase m-ellipses t-md-10">Serviced Apartment</div>
                                     <div className ="t-h3 semi-thin  m-ellipses t-md-10">Ikoyi </div>
                                     <div className ="t-h4 semi-thin  m-ellipses t-md-10">Ikoyi Lagos </div>
                                 </div>
                             </div>
                         </div>
                    </div>
    </div>

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