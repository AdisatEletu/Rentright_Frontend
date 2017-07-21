import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import TenantCard from '../tenantCard';
import CircleLinks from '../tenantlayouts/circle_links';
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant, showLoading, hideLoading, errorLoading } from '../../../state/actions/tenantAction';


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
               <CompletenessBar completeness = {this.props.myProfile.tenants.completed} label = "Profile completeness" />
            <div className = "m-step">
                <CircleLinks linkTo = {"/tenant" + this.uuid + "/profile"} scale = {true} childLabel = "Overview" label = "A" isActive = {true}/>
                 <CircleLinks linkTo = {"/tenant/profile/generalinfo" + this.uuid} scale = {false} childLabel = "General Info" label = "1" isActive = {false}/>
                 <CircleLinks linkTo = {"/tenant/profile/bioinfo" + this.uuid} scale = {false} childLabel = "Bio Info" label = "2" isActive = {false}/>
                 <CircleLinks linkTo = {"/tenant/profile/employmentinfo" + this.uuid} scale = {false} childLabel = "Employment Info" label = "3" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/residentialinfo" + this.uuid} scale = {false} childLabel = "Residential Info" label = "4" isActive = {false}/>
                <CircleLinks linkTo = {"/tenant/profile/immigrationinfo" + this.uuid} scale = {false} childLabel = "Immigrantion Info" label = "5" isActive = {false}/>
    

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
