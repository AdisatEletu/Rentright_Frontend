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
import {findDOMNode} from 'react-dom';
import 'antd/dist/antd.css';
import Spin from 'antd/lib/spin';
import  Button from 'antd/lib/button';

import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant, showLoading, hideLoading, errorLoading, imageready,  getProfileStruct,uploadFile, readThis } from '../../../state/actions/tenantAction';
import $ from 'jquery'

 class ImageUpdate extends Component{

    constructor(props) {           
        super(props) 
        this.state = {};          
        this.identifiers = [{}];
        this.handleFiles = this.handleFiles.bind(this);  
        this.handlejquery = this.runjquery.bind(this);  
    }
     runjquery = ()=>{
      let clicker = findDOMNode(this.refs.buttonj);
       $(clicker).click();
     }

     handleFiles = (event) =>{
       this.props.readThis (event, 'users/profilepicture/'+this.uuid, this.uuid );       
     }

       componentWillMount(){
        console.log(this.props.myProfile);
        this.uuid = this.props.auth.user.uuid;  
        this.props.loadTenant('/'+this.uuid);  
        this.props.imageready(null)
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
        <div className = "t-flex t-flex-column t-align-content-space-between t-jestify-center t-sm-padding t-full-height t-md-10 il-contain">
           <input type="file" className = "hide"  ref = "buttonj" onChange={this.handleFiles}/>
          <div className = "t-md-10 t-flex t-justify-left t-flex-column m-padbox">
          <div className = "il-m-heading t-col-10  t-capitalize mid ">Upload your profile images here please</div>
          <div className = "il-m-sub t-col-10  ">Please select a clear picture of your self as this may help determine the acceptibility and judge of character. </div>
          
          </div>{/*first texthold*/}
          <div className = "t-flex t-flex-row t-justify-space-between t-md-10">
          <div className = "p-widget t-md-6 t-flex t-flex-column il-image-cont">            
           <div className = "il-top t-md-10 t-flex t-align-center t-justify-center">
             <div className = "il-image p-border "  style =   { !this.props.myProfile.tenants.tenant_bio.profile_picture ? {backgroundImage:'url('+this.props.fileToServer.content+')'} : {backgroundImage:'url('+this.props.myProfile.tenants.tenant_bio.profile_picture+')'}  }     >
             <div className =  "il-cover t-flex t-align-center t-align-contet-center t-flex-column t-justify-center t-fullheight "  >
               {  
                 this.props.loader.Loading
                  ? 
               <div className = "t-fullheight t-md-10 t-flex t-flex-column t-align-content-center t-align-center t-justify-center t-active">
                 <Spin size="large" />
               <div className = "m-bottom-control  push-down t-flex t-justify-right t-md-10">
                
                   <Button type="primary" loading={true} >Loading please wait</Button>
     
                  </div>
                 </div> 
                 :              
              <div className = "t-fullheight t-md-10 t-flex t-flex-column">
              {! this.props.fileToServer ?
              <i className = "material-icons il-icons">account_circle</i>    
              :
              null
                 }                    
               <div className = "m-bottom-control  push-down t-flex t-justify-right t-md-10">
                          <Button type="primary" icon="download" onClick = {this.runjquery}>Upload Image</Button>
                 </div>        
               </div>               

               }                     

           </div></div></div>
           <div className = "t-flex t-justify-center t-column t-md-10 p-border">
            <div className = "il-bottm t-md-7 t-flex t-flex-column t-align-left t-justify-center">
              <div className = "il-m-heading-2 il-green">Please select your prefered ID Picture </div>
              <div className = "t-h3 Montserrat">You have currently not selected any image, Your prodfile is incomplete </div>
              <div className = "h2">{this.props.fileToServer ? this.props.fileToServer.error ? "Sorry could not load encountered error on the server" : "Data Loaded Successfully" : "" }</div>
                          
              </div>
              </div>

          </div>
          <div className = "p-widget t-md-3 t-flex t-flex-column  t-white m-padding-zero b-transp personalize ">
           <div className = "m-overview-scale"><div className = "m-small-head">Bio Information</div><div className = "q-parent"><span>{this.props.myProfile.tenants.tenant_bio.completed + " %"}</span><div className = "q-hold"><div className = "q-green" style = {styleb}></div><div className = "q-white" style = {style2b}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">General Information</div><div className = "q-parent"><span>{this.props.myProfile.tenants.completed + " %"}</span><div className = "q-hold"><div className = "q-green"  style = {styleg}></div><div className = "q-white"  style = {style2g}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">Employment Information</div><div className = "q-parent"><span>{! this.props.myProfile.tenants.tenant_employment_history[0] ? '0%' :this.props.myProfile.tenants.tenant_employment_history[0].completed + '%' }</span><div className = "q-hold"><div className = "q-green"  style = {stylee}></div><div className = "q-white" style = {style2e}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">Residential Information</div><div className = "q-parent"><span>{! this.props.myProfile.tenants.tenant_residence_history[0] ? '0%' :this.props.myProfile.tenants.tenant_residence_history[0].completed + '%' }</span><div className = "q-hold"><div className = "q-green" style = {styler}></div><div className = "q-white" style = {style2r}></div></div></div></div>
                <div className = "m-overview-scale"><div className = "m-small-head">Immigration Information</div><div className = "q-parent"><span>{! this.props.myProfile.tenants.tenant_immigration_history[0] ? '0%' :this.props.myProfile.tenants.tenant_immigration_history[0].completed + '%' }</span><div className = "q-hold"><div className = "q-green" style = {stylei}></div><div className = "q-white" style = {style2i}></div></div></div></div>

  

          </div>
          </div>
          {/*overall container*/}
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
        loader: state.tenantProfileLoader,
        imageUpload: state.imageUpload,
        fileToServer:state.fileToServer 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    loadStructure: getProfileStruct,
    uploadFile :uploadFile,
    readThis :readThis ,
    imageready:imageready

    
  }, dispatch);
}

ImageUpdate.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired,
    


}

export default connect(matchStateToProps, mapDispatchToProps)(ImageUpdate)
