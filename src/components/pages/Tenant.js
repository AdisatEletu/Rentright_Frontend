import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Profile from './account/landlord/Profile';
import T_left from "./layouts/T-left";
import T_main from "./layouts/T-main";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProperty} from "../../state/actions/userActions";
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../state/actions/tenantAction'

class Tenant extends Component{
    uuid;
    constructor(props) {                  
        super(props)
        this.state = {
            tenantProfile:null         
        }         
        console.log(this.props)  
    }
    componentDidMount(){        
    try{
       this.uuid = this.props.match.params.id;
     }catch(err){
    console.log(err)
    }
    this.props.loadSpecificTenant('/'+this.props.match.params.id).then( ()=>{
    this.setState( {tenantReducer:this.props.tenantReducer})
       })
    

    }
    render (){
    const {auth} = this.props;
  
   return(  
     ! this.state.tenantReducer ? <div>Loading</div>    
:     
 
<div className = "t-fullheight t-fullwidth t-white t-flex t-container t-align-stretch t-justify-space-between">
      <div className = "t-nav"></div>
       <T_left userid = {this.uuid}  profile = {this.state.tenantReducer} />
       <T_main userid = {this.uuid}   profile = {this.state.tenantReducer}/>  
       </div>
        );
    }
}

function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        tenantReducer : state.tenantReducer,
        profile:state.tenantProfile
             
        
 
    }      
    
}

Tenant.PropTypes = {
    loadSpecificTenant: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    //tenantProfile: PropTypes.object.isRequired
}

export default connect(matchStateToProps,{loadSpecificTenant})(Tenant)

//export default Tenant ;