import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import TenantCard from '../tenantCard';
import CircleLinks from '../tenantlayouts/circle_links';
import ProfileBar from '../tenantlayouts/profile_bar';
import ProfileContent from '../tenantlayouts/profile_content';
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant, showLoading, hideLoading, errorLoading,  getProfileStruct } from '../../../state/actions/tenantAction';

 class PublicProfile extends Component{
    constructor(props) {           
        super(props) 
        this.state = {};
        this.uuid = this.props.auth.user.uuid;  
         this.identifiers = [{}];
    }
       componentWillMount(){
        console.log(this.props.profile);
         this.props.loadTenant('/'+this.uuid);  
        this.props.loadStructure('/profile/structure/?uuid='+this.uuid, true);    
          
       }
    componentWillReceiveProps(nexprops){
        if (this.props.myProfile.tenants){
        try{
          this.identifiers = this.props.myProfile.tenants.tenant_employment_history;
        }
        catch(err){
               this.identifiers = [{}]; 
        }
        }
        else{
             this.identifiers = [{}]; 
        }
    }
    componentDidMount(){     
        if (this.props.myProfile.tenants)    {
                     

        }

     }
     

    render(){

        if(this.props.structure && this.props.myProfile.tenants){        
        return(
        this.props.loader.Loading   ? 
         <div className = "t-flex t-flex-row t-md-10  t-padtop hey-widget "> 
          <div className = "t-sup-h1 t-green-f"><i className = "fa fa-spin fa-cog"></i> </div>
         <div className = "t-flex t-flex-column">
         <span className = "span t-uppercase ">Loading</span>
          <span> We are currently loading information from the server..</span>
        </div>
         </div>
          :
        <div className = "t-md-10 t-flex t-flex-row t-justify-space-between">
        <div className = "t-md-65 t-fullheight t-flex t-flex-column t-algin-center ">
          <ProfileBar 
           first_name = {this.props.auth.user.first_name}
           last_name = {this.props.auth.user.last_name}
           
           identifiers = { {'email' : this.props.auth.user.email, 'User ID': this.props.auth.user.uuid}}
           otheridentifiers = {  ! this.props.myProfile.tenants.tenant_employment_history ?  [] : this.props.myProfile.tenants.tenant_employment_history[0] }          
           />
   <div className = "t-flex t-flex-row t-md-10 t-justify-space-between">  
        <div className = "t-flex t-flex-column t-md-5 t-justify-space-between">             
        <div className = "t-md-10 p-widget m-padding-zerox">
        <div className = "m-heading">Bio Information</div>
        <div className = "m-sub">Tenant personal information</div>
      {   this.props.structure.structure ? this.props.structure.structure.tenant_bio.length > 0  ?  
          this.props.structure.structure.tenant_bio.map ( (item, index)=>{                             
          return(          
            <ProfileContent keyName = {item.keyname} value = {item.value}   key = {item.key}  />         
              )
             })
             :
            <div className = "profile-key">No information provided for this section</div>
             :
             null        
           }
             </div> 
    <div className = "t-md-10 p-widget m-padding-zerox">
        <div className = "m-heading">Residential History</div>
        <div className = "m-sub">Tenant's rental profile</div>
      {   this.props.structure.structure ? this.props.structure.structure.tenant_residence_history.length > 0  ?  
          this.props.structure.structure.tenant_residence_history.map ( (item, index)=>{                             
          return(          
            <ProfileContent keyName = {item.keyname} value = {item.value}   key = {item.key}  />         
              )
             })
             :
             <div className = "profile-key">No information provided for this section</div>
             :
             null        
           }
             </div>
            </div> 
    <div className = "t-flex t-flex-column t-md-45 t-justify-space-between">
    <div className = "t-md-10 p-widget m-padding-zerox">
         <div className = "m-heading">Employment History</div>
        <div className = "m-sub">Tenant's Employment Portfolio</div>
      {   this.props.structure.structure ? this.props.structure.structure.tenant_employment_history.length > 0  ?  
          this.props.structure.structure.tenant_bio.map ( (item, index)=>{                             
          return(          
            <ProfileContent keyName = {item.keyname} value = {item.value}   key = {item.key}  />         
              )
             })
             :
             <div className = "profile-key">No information provided for this section</div>
             :
             null        
           }
             </div> 
            <div className = "t-md-10 p-widget m-padding-zerox">
             <div className = "m-heading">General Information</div>
        <div className = "m-sub">Tenant's Other personal Information</div>
      {   this.props.structure.structure ? this.props.structure.structure.general_info.length > 0  ?  
          this.props.structure.structure.general_info.map ( (item, index)=>{                             
          return(          
            <ProfileContent keyName = {item.keyname} value = {item.value}   key = {item.key}  />         
              )
             })
             :
             <div className = "profile-key">No information provided for this section</div>
             :
             null        
           }
             </div> 
            </div>
            </div>
        <div className = "t-flex t-flex-column t-md-10 t-justify-space-between">
            <div className = "t-md-10 p-widget m-padding-zerox">
                <div className = "m-heading">Immigration Iformation</div>
        <div className = "m-sub">Tenant's immigration history</div>
      {   this.props.structure.structure ? this.props.structure.structure.tenant_immigration_history.length > 0  ?  
          this.props.structure.structure.tenant_immigration_history.map ( (item, index)=>{                             
          return(          
            <ProfileContent keyName = {item.keyname} value = {item.value}   key = {item.key}  />         
              )
             })
             :
             <div className = "profile-key">No information provided for this section</div>
             :
             null        
           }
         </div>
        </div>








       
          </div>         
          <div className = "t-md-3 p-widget no-marge"></div>
        </div>
         
                 
        );
    }else{
    <div className = "t-flex t-flex-row t-md-10  t-padtop "> 
        <div className = "t-sup-h1 t-green-f"><i className = "fa fa-spin fa-cog"></i> </div>
         <div className = "t-flex t-flex-column">
         <span className = "span t-uppercase ">Loading</span>
          <span> We are currently loading information from the server..</span>
        </div>
         </div>
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
        structure:state.structure,           
        loader: state.tenantProfileLoader
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    loadStructure: getProfileStruct
    
  }, dispatch);
}

PublicProfile.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired


}

export default connect(matchStateToProps, mapDispatchToProps)(PublicProfile)
