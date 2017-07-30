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
import {findDOMNode} from 'react-dom'
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
             <div className = "il-image "  style =   { !this.props.myProfile.tenants.tenant_bio.profile_picture ? {backgroundImage:'url('+this.props.fileToServer.content+')'} : {backgroundImage:'url('+this.props.myProfile.tenants.tenant_bio.profile_picture+')'}  }     >
             <div className =  "il-cover t-flex t-align-center t-align-contet-center t-flex-column t-justify-center t-fullheight "  >
               {  
                 this.props.loader.Loading
                  ? 
               <div className = "t-fullheight t-md-10 t-flex t-flex-column">
                <i className = "fa fa-spinner fa-spin fa-3x fa-fw il-icons"></i>
                                  <div className = "m-bottom-control  push-down t-flex t-align-right t-md-10"><a className = "tr-highlight il-tr"><i className = "fa fa-submit"></i>&nbsb; Loading please wait</a> </div>
                 </div> 
                 :              
              <div className = "t-fullheight t-md-10 t-flex t-flex-column">
              {! this.props.fileToServer ?
              <i className = "material-icons il-icons">account_circle</i>    
              :
              null
                 }                    
               <div className = "m-bottom-control  push-down t-flex t-align-right t-md-10"><a className = "tr-highlight il-tr"  onClick = {this.runjquery}><i className = "fa fa-submit"></i>&nbsb; Upload Image</a> </div>        
               </div>               

               }                     

           </div></div></div>
           <div className = "t-flex t-justify-center t-column t-md-10">
            <div className = "il-bottm t-md-7 t-flex t-flex-column t-align-left t-justify-center">
              <div className = "il-m-heading-2 il-green">Please select your prefered ID Picture </div>
              <div className = "t-h3 Montserrat">You have currently not selected any image, Your prodfile is incomplete </div>
              <div className = "h2">{this.props.fileToServer ? this.props.fileToServer.error ? "Sorry could not load encountered error on the server" : "Data Loaded Successfully" : "" }</div>
                          
              </div>
              </div>

          </div>
          <div className = "p-widget t-md-3 t-flex "></div>
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
