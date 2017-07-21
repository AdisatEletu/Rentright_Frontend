import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import TenantCard from '../tenantCard';
import CircleLinks from '../tenantlayouts/circle_links';
import ProfileBar from '../tenantlayouts/profile_bar';
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant, showLoading, hideLoading, errorLoading } from '../../../state/actions/tenantAction';

 class PublicProfile extends Component{
    constructor(props) {           
        super(props) 
        this.state = {};
        this.props.loadTenant('/'+this.props.match.params.id);          
           this.uuid = '/'+this.props.match.params.id;
           this.identifiers = [{}];
    }
       componentWillMount(){
        console.log(this.props.profile);


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
        if(this.props.myProfile.tenants){        
        return(
        <div className = "t-md-10 t-fullheight">
          <ProfileBar 
           first_name = {this.props.auth.user.first_name}
           last_name = {this.props.auth.user.last_name}
           
           identifiers = { {'email' : this.props.auth.user.email, 'User ID': this.props.auth.user.uuid}}
           otheridentifiers = {  ! this.props.myProfile.tenants.tenant_employment_history ?  [] : this.props.myProfile.tenants.tenant_employment_history[0] }          
           />
        <div className = "t-flex t-flex-row t-md-10 t-justify-space-between"> 
           <div className = "t-md-6 p-widget">

             { this.props.myProfile.tenants.tenant_residence_history ? null : this.props.myProfile.tenants.tenant_residence_history.map ( (item, index)=>{  
                    return (
                         <div className  = "t-md-7 t-flex pre-hack " key= {item.id}>
                             {  item == "address" && this.props.myProfile.tenants.tenant_residence_history.address ?  
                          <div className  = "list t-md-10 t-flex t-justify-space-between p-desc t-flex-row"><div className = "p-bolden">{item}</div> {this.props.myProfile.tenants.tenant_residence_history.address.address} <div className = "p-highlight"></div></div>                             
                             : 
                               <div className  = "list t-md-10 t-flex t-justify-space-between p-desc t-flex-row"><div className = "p-bolden">{item}</div>{this.props.myProfile.tenants.tenant_residence_history[item]}<div className = "p-highlight"></div></div>
                             }
                         
                          </div>   
                    )
                })                              
                }


           </div>
           <div className = "t-md-3 p-widget"></div>
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

PublicProfile.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired


}

export default connect(matchStateToProps, mapDispatchToProps)(PublicProfile)
