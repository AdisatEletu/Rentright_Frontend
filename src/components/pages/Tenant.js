import React, {Component} from "react";
import {Switch,Route} from "react-router-dom";
import Profile from "./account/landlord/Profile";
import T_left from "./layouts/T-left";

import TenantProfile from "./layouts/TenantProfile";
import Advert from "./tenantlayouts/advert";
import GeneralForm from "./layouts/GeneralForm";
import ResidentialForm from "./layouts/ResidentialForm";
import EmploymentForm from "./layouts/EmploymentForm";
import TenantSearch from "./layouts/tenant_search";
import ImmigrationForm from "./layouts/ImmigrationForm";
import PublicProfile from "./layouts/PublicProfile";
import ImageUpdate from "./layouts/ImageUpdate";
import {NavLink} from "react-router-dom";
import BioForm from "./layouts/BioForm";
import TenantNav from "./tenantlayouts/tenant_nav";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";  
import PropTypes from "prop-types";
import {getProperty} from "../../state/actions/userActions";
import { loadAllTenants, loadSpecificTenant,imageready, patchSpecificTenant,connectToSocket, deleteSpecificTenant, showLoading, hideLoading, errorLoading } from '../../state/actions/tenantAction';


class Tenant extends Component{
    uuid;
    constructor(props) {                  
        super(props)  
        console.log(this.props) 
       //this.uuid = "/"+this.props.match.params.id 
        this.first_name = this.props.auth.user.first_name;
        this.last_name =  this.props.auth.user.last_name;   
        this.uuid = this.props.auth.user.uuid;  
        this.props.loadTenant("/"+this.uuid);
      
 
    }
    componentDidMount(){    
 
    try{
       //this.uuid = this.props.match.params.id;
        
         this.props.connectToSocket(this.uuid);
        this.context.router.history.push("/tenant/profile/" + this.uuid);
  
     }catch(err){
    console.log(err)
}
 

    }
loadprofile = ()=>{
    this.props.loadTenant("/"+this.props.match.params.id);
   } 
   
    render (){
   if(this.props.myProfile.tenants){
    return(
<div className = "t-body">
 <div className = "t-fullheight t-fullwidth t-white t-flex t-container t-align-stretch t-justify-left">
           {this.props.myProfile.tenants.tenant_bio ? <TenantNav first_name = {this.props.user.first_name}  myProfile = {this.props.myProfile}/>  : <TenantNav first_name = {this.props.user.first_name}/> }
          <div className = "t-left t-gray  t-flex  t-align-content-space-between t-right-bx t-right-bx t-flex-column">
      
          <div className = "t-justify-left t-flex">
            <div className = "t-flex-2 t-contain m-logo ">                
            </div>
         </div>

         <div className = " t-justify-center t-flex">   
 
         <NavLink className = "t-rounded m-prf t-white t-cover m-me"    
         style = { ! this.props.myProfile.tenants.tenant_bio ?
          {backgroundImage:"url("+this.props.fileToServer.content+")"} :  this.props.myProfile.tenants.tenant_bio.profile_picture ?
           {backgroundImage:"url("+this.props.myProfile.tenants.tenant_bio.profile_picture+")"} : 
            {backgroundImage:"url("+this.props.fileToServer.content+")"} 
           }
            to = {"/tenant/profilepicture/" + this.uuid +"/"}   >  
             <div className = "m-cover t-flex t-align-center t-fullheight t-fullwidth t-justify-center"> <i className = "material-icons  md-12 right">linked_camera</i> </div>           
          </NavLink>
        
          </div>
 
         <div className = " t-justify-center t-flex t-center-f  t-flex-column t-justify-center m-top-sm ">        
            <span className = "roboto t-h4 t-space-1 mid t-uppercase  m-bluish-f block m-ellipses">{this.props.user.first_name} {this.props.user.last_name}</span>
            <span className = "open-sans t-h5 mid semi-bold t-uppercase m-bluish-f block m-ellipses">{this.props.user.email}</span>
            <div className = "t-center-f  t-gray-lighten-1-f t-flex m-top t-h6  t-justify-center t-md-10 m-ellipses"><i className="material-icons">bubble_chart</i></div>
          </div>

<div className = "t-flex t-flex-column m-top-med">
         <NavLink className = "m-nav-li t-md-10" to = {"/tenant/profile/"+this.uuid } activeClassName ="m-active-nav"><i className = "fa fa-user-circle lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Registeration Status</span> <div className = "t-bullet m-activate">{this.props.myProfile ? this.props.myProfile.tenants.completed +' %' : null}</div> </NavLink>
        <NavLink className = "m-nav-li t-md-10" to = {"/tenant/publicprofile/" + this.first_name +"/" + this.last_name + "/" + this.uuid +"/"}  activeClassName="m-active-nav"><i className = "fa fa-bookmark-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Public Profile</span><div className = "t-bullet"></div> </NavLink>
        <NavLink className = "m-nav-li t-md-10" to = {"/tenant/find/accommodation/" + this.uuid +"/"}  activeClassName="m-active-nav"><i className = "fa fa-bookmark-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Applications</span><div className = "t-bullet"></div> </NavLink>
        <NavLink className = "m-nav-li t-md-10"  to = "/tenant/messages/:id"  activeClassName = "m-active-nav"><i className = "fa fa-envelope-open-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses ">Messages</span> <div className = "t-bullet"></div> </NavLink>
        <NavLink className = "m-nav-li t-md-10"  to = "/tenant/propertysearch/:id" activeClassName = "m-active-nav"><i className = "fa fa-building-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses"> Find Properties</span> <div className = "t-bullet m-activate">10 new</div> </NavLink>
     </div>
      </div>

 
    <div className = "t-midmain t-flex t-jusify-center t-flex-row">


        <div  className = "t-dash t-flex  t-justify-center t-flex-column">
            <Switch>
              <Route  exact path="/tenant/profile/:id/"  component={TenantProfile}/>  
              <Route  exact path="/tenant/profile/generalinfo/:id"  component={GeneralForm}/>       
              <Route  exact path="/tenant/profile/bioinfo/:id"  component={BioForm}/>     
              <Route  exact path="/tenant/profile/residentialinfo/:id"  component={ResidentialForm}/>   
              <Route  exact path="/tenant/profile/employmentinfo/:id"  component={EmploymentForm}/>  
            <Route  exact path="/tenant/profile/immigrationinfo/:id"  component={ImmigrationForm}/>    
             <Route  exact path="/tenant/find/accommodation/:id"  component={TenantSearch}/> 
             <Route  path="/tenant/publicprofile/:first_name/:last_name/:id"  component={PublicProfile}/> 
              <Route  path="/tenant/profilepicture/:id"  component={ImageUpdate}/> 
                </Switch>
          </div>
               
    </div>
<Advert/>
</div>
</div>


    );
  
}
else{

     return (
          
     <div>  Loading..  </div>

     )
    
     
}


    }
}

function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user,
       fileToServer:state.fileToServer      
        
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
         imageready:imageready ,
         connectToSocket:connectToSocket     
  }, dispatch);
}

Tenant.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    //tenantProfile: PropTypes.object.isRequired
}

Tenant.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(Tenant)

//export default Tenant ;