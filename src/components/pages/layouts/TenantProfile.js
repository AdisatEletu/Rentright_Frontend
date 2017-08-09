import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import TenantCard from '../tenantCard';
import CircleLinks from '../tenantlayouts/circle_links';
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant, showLoading, hideLoading, errorLoading,getFormStruct } from '../../../state/actions/tenantAction';


 class TenantProfile extends Component{
    constructor(props) {           
        super(props) 
        this.state = {};

        this.props.loadTenant('/'+this.props.match.params.id); 
        this.props.getFormStruct();         
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
        let stylee = {
                  width:'0%',
                  backgroundColor:'#FF782D' 
                }
             let style2e = {
               width:'100%',
               backgroundColor:"#FFFCEC"
            } 
            let styler = {
                  width:'0%',
                  backgroundColor:'#FF782D' 
                }
             let style2r = {
               width:'100%',
               backgroundColor:"#FFFCEC"
            } 
            let stylei = {
                  width:'0%',
                  backgroundColor:'#FF782D' 
                }
             let style2i = {
               width:'100%',
               backgroundColor:"#FFFCEC"
               } 
        //#FF782D  orange
        //#b2d234 green
            let styleb = {
               width:this.props.myProfile.tenants.tenant_bio.completed + '%',
               backgroundColor: this.props.myProfile.tenants.tenant_bio.completed < 50 ? '#FF782D' : '#66BB6A'            
                }
             let style2b = {
               width:100 - (this.props.myProfile.tenants.tenant_bio.completed) + '%',
               backgroundColor:"#FFFCEC"
               }
              let styleg = {
               width:this.props.myProfile.tenants.completed + '%',
               backgroundColor: this.props.myProfile.tenants.completed < 50 ? '#FF782D' : '#66BB6A'            
                }
             let style2g = {
               width:100 - (this.props.myProfile.tenants.completed) + '%',
               backgroundColor:"#FFFCEC"
            } 
            if (this.props.myProfile.tenants.tenant_employment_history.length > 0){
             stylee = {               
               width:this.props.myProfile.tenants.tenant_employment_history[0].completed + '%',
               backgroundColor:this.props.myProfile.tenants.tenant_employment_history[0].completed < 50 ? '#FF782D' : '#66BB6A'            
                }
            style2e = {
               width:100 - (this.props.myProfile.tenants.tenant_employment_history[0].completed) + '%',
               backgroundColor:"#FFFCEC"
               } 
            }//ifelse\\
            else{
            stylee = {
                 width:'0%',
                  backgroundColor:'#FF782D' 
                }
            style2e = {
               width:'100 %',
               backgroundColor:"#FFFCEC"
               } 

            }
            try{
             if (this.props.myProfile.tenants.tenant_residence_history.length > 0){
             styler = {               
               width:this.props.myProfile.tenants.tenant_residence_history[0].completed + '%',
               backgroundColor:this.props.myProfile.tenants.tenant_residence_history[0].completed < 50 ? '#FF782D' : '#66BB6A'            
                }
             style2r = {
               width:100 - (this.props.myProfile.tenants.tenant_residence_history[0].completed) + '%',
               backgroundColor:"#FFFCEC"
               } 
            }//ifelse\\
            else{
            styler = {
                 width:'0%',
                  backgroundColor:'#FF782D' 
                }
            style2r = {
               width:'100 %',
               backgroundColor:"#FFFCEC"
               } 

            }
            }catch(err){
               console.log(err)
            }
        try{
         if (this.props.myProfile.tenants.tenant_immigration_history.length > 0){
             stylei = {               
               width:this.props.myProfile.tenants.tenant_immigration_history[0].completed + '%',
               backgroundColor:this.props.myProfile.tenants.tenant_residencet_history[0].completed < 50 ? '#FF782D' : '#66BB6A'            
                }
             style2i = {
               width:100 - (this.props.myProfile.tenants.tenant_immigration_history[0].completed) + '%',
               backgroundColor:"#FFFCEC"
               } 
            }//ifelse\\
            else{
            stylei = {
                 width:'0%',
                  backgroundColor:'#FF782D' 
                }
            style2i = {
               width:'100 %',
               backgroundColor:"#FFFCEC"
               } 

            }
        }catch(err){
          console.log(err);
        }


        
           return(
        <div className = "t-md-10 t-fullheight t-scroll t-flex t-flex-column " >
        <div className = "t-md-10 t-flex t-justify-space-between m-bottomx ">
         <div className = "p-widget t-md-65 t-white personalize  m-bottomx ">
             <div className = "t-flex t-flex-column t-md-10 t-justify-left ">
            <div className = "t-gray-darken-3-f mid t-h2  "><span className = "">Please update your profile</span> </div> 
            <span className = "t-gray-darken-1-f thin t-h3 t-lh-h2  m-topp">You can quickly add missing profile information here</span>
            </div>
               <CompletenessBar completeness = {this.props.myProfile.tenants.completed} withinform = {false} label = "Profile completeness" />
            <div className = "m-step">
                <CircleLinks linkTo = {"/tenant/profile" + this.uuid } scale = {true} childLabel = "Overview" label = "A" isActive = {true}/>     
                 <CircleLinks linkTo = {"/tenant/profile/bioinfo" + this.uuid} scale = {false} childLabel = "Bio Info" label = "1" isActive = {false}/>
                 <CircleLinks linkTo = {"/tenant/profile/employmentinfo" + this.uuid} scale = {false} childLabel = "Employment Info" label = "2" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/residentialinfo" + this.uuid} scale = {false} childLabel = "Residential Info" label = "3" isActive = {false}/>
                <CircleLinks linkTo = {"/tenant/profile/immigrationinfo" + this.uuid} scale = {false} childLabel = "Immigration Info" label = "4" isActive = {false}/>
                <CircleLinks linkTo = {"/tenant/profile/generalinfo" + this.uuid} scale = {false} childLabel = "General Info" label = "5" isActive = {false}/>
    

              </div>
                </div>
            <div className =  "p-widget t-md-3 t-white m-padding-zero b-transp personalize">
                
                <div className = "m-overview-scale"><div className = "m-small-head">Bio Information</div><div className = "q-parent"><span>{this.props.myProfile.tenants.tenant_bio.completed + " %"}</span><div className = "q-hold"><div className = "q-green" style = {styleb}></div><div className = "q-white" style = {style2b}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">General Information</div><div className = "q-parent"><span>{this.props.myProfile.tenants.completed + " %"}</span><div className = "q-hold"><div className = "q-green"  style = {styleg}></div><div className = "q-white"  style = {style2g}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">Employment Information</div><div className = "q-parent"><span>{! this.props.myProfile.tenants.tenant_employment_history[0] ? '0%' :this.props.myProfile.tenants.tenant_employment_history[0].completed + '%' }</span><div className = "q-hold"><div className = "q-green"  style = {stylee}></div><div className = "q-white" style = {style2e}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">Residential Information</div><div className = "q-parent"><span>{! this.props.myProfile.tenants.tenant_residence_history[0] ? '0%' :this.props.myProfile.tenants.tenant_residence_history[0].completed + '%' }</span><div className = "q-hold"><div className = "q-green" style = {styler}></div><div className = "q-white" style = {style2r}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">Immigration Information</div><div className = "q-parent"><span>{! this.props.myProfile.tenants.tenant_immigration_history[0] ? '0%' :this.props.myProfile.tenants.tenant_immigration_history[0].completed + '%' }</span><div className = "q-hold"><div className = "q-green" style = {stylei}></div><div className = "q-white" style = {style2i}></div></div></div></div>

              </div>  
             </div> 

             <div className = "t-md-10 p-widget margin-below  btransp  m-padding-zero">
                 <div className = "btrcover">
                     <div className = ""></div>
                     <div className = "m-marg-top t-flex t-flex-row t-justify-center  t-md-10"><NavLink  to = {"/tenant/profile/"  + this.uuid +"/"}  className = "tr-button">Get Started </NavLink ><div className = "tr-highlight">Find A Home</div></div>

                 </div>
                 </div>

            {/* <div className= "m-other-profile  m-push-down">
               <div className= "m-others m-blinks int1"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int2"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int3"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int4"><div className= "m-cover"></div></div>
               <div className= "m-others m-blinks int5"><div className= "m-cover"></div></div>
            </div>*/}
       
        
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
        user:state.user.auth.user,
        form:state.getform.data               
        
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    getFormStruct: getFormStruct
  }, dispatch);
}

TenantProfile.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired


}

export default connect(matchStateToProps, mapDispatchToProps)(TenantProfile)
