import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import TenantCard from '../tenantCard';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../../state/actions/tenantAction';


 class TenantProfile extends Component{
    constructor(props) {           
        super(props) 
        this.state = {};

        this.props.loadTenant('/'+this.props.match.params.id);          
           this.uuid = '/'+this.props.match.params.id;

    }
       componentWillMount(){
        console.log(this.props.profile);
         console.log('Wahala again');
       }
    componentDidMount(){  
        

     }
     

    render(){
        if(this.props.myProfile.tenants){
            let style = {
               width:this.props.myProfile.tenants.completed + '%' 
        }
         let style2 = {
               width:100 - (this.props.myProfile.tenants.completed) + '%'
        }
           return(
        <div className = "t-md-10 t-fullheight" >
        <div className = "m-profile-setup">
             <div className = "t-flex t-flex-column t-md-10 t-justify-left ">
            <div className = "t-gray-darken-3-f mid t-h1  "><span className = "">Please update your profile</span> </div> 
            <span className = "t-gray-darken-1-f thin t-h2 t-lh-h2  m-topp">You can quickly add missing profile information here</span>
            </div>
       
         <div className = "m-heading m-med-topp t-flex t-flex-row t-align-left"><span>Profile completeness</span>  <span className = "lbl">{this.props.myProfile.tenants.completed}%</span></div>
        
    
            <div className = "t-flex  t-md-10 t-justify-left t-flex-row ">
              <div className = "t-flex t-md-10 t-align-top t-justify-center">
                  <div className = "t-flex t-flex-column t-md-10  t-justify-center t-sup-h3 t-gray-darken-3-f Roboto t-center-f  thin t-align-top">
                      <div className = "t-flex t-flex-row   t-md-8">
                          <div className = "m-total-bar" style={style}></div>
                      <div className = "m-total-barw"  style={style2}></div>
                      </div>
                      </div>
                  </div>
              </div>

            <div className = "m-step">
                  <NavLink className = "m-balls-hold" to = {"/tenant/profile/generalinfo" + this.uuid} uuid = {this.uuid} myProfile = {this.props.myProfile}><div className = "m-balls">1</div><div className = "m-balls-text">General Info</div></NavLink>
                   <div className = "m-balls-hold"><div className = "m-balls">2</div><div className = "m-balls-text">Bio info</div></div>
                    <div className = "m-balls-hold"><div className = "m-balls">3</div><div className = "m-balls-text">Employment Info</div></div>
                     <div className = "m-balls-hold"><div className = "m-balls">4</div><div className = "m-balls-text">Residential Info </div></div>
                      <div className = "m-balls-hold"><div className = "m-balls">5</div><div className = "m-balls-text">Immigration Info</div></div>

    

              </div>
                </div>
                 
             <div className= "m-other-profile">
               <div className= "m-others m-blinks int1"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int2"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int3"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int4"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int5"><div className= "m-cover"></div></div>
            </div>
       
        
   </div>
        
        );
    }else{
        return <div>Loading..</div>
    }
    
    }
}
function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        myProfile : state.tenantProfile,
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

TenantProfile.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}

export default connect(matchStateToProps, mapDispatchToProps)(TenantProfile)
