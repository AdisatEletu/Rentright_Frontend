import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
//import Profile from './account/landlord/Profile';
//import T_left from "./layouts/T-left";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
//import {getProperty} from "../../state/actions/userActions";
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../../state/actions/tenantAction';
 class T_main extends Component{
    constructor(props) {           
        super(props)  
   
    }

    render(){
     const {auth} = this.props;
     const {tenantReducer} = this.props    
     const {results} = tenantReducer.tenants
     console.log(results)
     let greenf = 50 + '%';
     let whitef = 100 - 50  + '%'
      const style1 = {width : greenf,};
      const style2 = {width: whitef, }; 
     var divStyle = {
 width :  greenf ,

};
        return(         
         <div className = "t-midmain">
        <div className = "t-flex t-flex-row t-md-10 t-justify-space-between">
            <div className = "t-md-4 t-flex t-justify-space-between t-flex-row t-align-center">
            <span className = "t-sup-h2 semi-thin lato t-gray-darken-2-f  m-ellipses t-space-1">Welcome Tosin</span>
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

  
              <div className = "t-flex m-top-sm t-md-10 t-justify-center t-flex-row ">
              <div className = "t-flex t-md-10 t-align-top t-justify-center">
                  <div className = "t-flex t-flex-column t-md-8  t-justify-center t-sup-h1 t-gray-darken-3-f Roboto t-center-f  thin t-align-baseline">
                      <span className = "t-block t-center-f t-space-2"> Your Profile is {greenf} Complete </span>
                      <span className = "t-capitalize t-block t-center-f   t-space-1 t-h2">You need to complete your profile to about 60 %  before you can access properties</span>
                      <span className = "t-h3 t-block t-center-f">We will like for you to tell us a little bit about your self.</span>
                      <div className = "t-flex t-flex-row   t-md-8">
                          <div className = "m-total-bar" style = { style1 }></div>
                      <div className = "m-total-barw" style = {style2}></div>
                      </div>
                      </div>
                      <div className = " t-justify-right t-flex t-md-2">        
                      <div className = "t-rounded m-prf2 t-white t-cover m-me">  
                      <div className = "m-cover t-flex t-align-center t-fullheight t-fullwidth t-justify-center"> <i className = "material-icons  md-12 right">linked_camera</i> </div>           
                     </div>
                    </div>
                  </div>
              </div>
             <div className = "t-flex t-justify-space-between  t-md-9 t-flex-row m-top-med t-flex-wrap">
            <div className = "m-step">
                     <div className = "m-balls-hold"><div className= "m-balls">1</div><div className= "m-balls-text">General Information <span className = "highlight"> 50% </span></div></div>
                   <div className = "m-balls-hold"><div className= "m-balls">2</div><div className= "m-balls-text">Bigraphic Information <span className = "highlight"> 50% </span> </div></div>
                    <div className = "m-balls-hold"><div className= "m-balls">3</div><div className= "m-balls-text">Residential History <span className = "highlight"> 20% </span></div></div>
                     <div className = "m-balls-hold"><div className= "m-balls">4</div><div className= "m-balls-text">Immigration History <span className = "highlight">30%</span></div></div>
                      <div className = "m-balls-hold"><div className= "m-balls">5</div><div className= "m-balls-text">Emplyment History <span className = "highlight">40 %</span> </div></div>
              </div>              
               
            {/*  <TenantCard   tenantReducer = { tenantReducer} percentage = {!results.completed ?0 : results.completed}  subtitle = "Update general information useful for building your tenacny profile" title = "General Information"  icon = "restore" />
               <TenantCard   tenantReducer = { tenantReducer} percentage = {!results.tenant_bio ? 0: results.tenant_bio.completed}   subtitle = "Update general information useful for building your tenacny profile" title = "Bio Information"  icon = "perm_identity" />
                <TenantCard   tenantReducer = { tenantReducer} percentage = {!results.tenant_residence_history? 0: results.tenant_residence_history.completed}  subtitle = "Update general information useful for building your tenacny profile" title = "Residential History"  icon = "location_on" />
                 <TenantCard   tenantReducer = { tenantReducer} percentage = {!results.tenant_immigration_history ? 0 : results.tenant_immigration_history.completed}   subtitle = "Update general information useful for building your tenacny profile" title = "Immigration History"  icon = "language" />
                 <TenantCard   tenantReducer = { tenantReducer}  percentage = {!results.tenant_employment_history ? 0 : results.tenant_employment_history.completed}  subtitle = "Update general information useful for building your tenacny profile" title = "Emplyment History"  icon = "person_pin" />
               
               */}
                </div>
               </div>
           
        );
    }
}
function matchStateToProps(state){
    return {
        tenantReducer:state.tenantReducer,  
         
        results:state.results
    }      
    
}
T_main.PropTypes = {
    profile: PropTypes.object.isRequired,
    //tenantProfile: PropTypes.object.isRequired
}

export default connect(matchStateToProps)(T_main)