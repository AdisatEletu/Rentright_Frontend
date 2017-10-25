import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import FormElements  from '../../tenantlayouts/form_elements';
import { loadAllTenants, loadSpecificTenant,post_my_application,
      load_my_query, load_my_applications,
        sendSocketPost,patchSpecificTenant, deleteSpecificTenant,
        showLoading, getFormStruct, hideLoading, errorLoading,
         breakFormToComponents,  getProfileStruct,         
         setCurrentApplicationFunc, setCurrentUnitFunc         
        } from '../../../../state/actions/tenantAction';
import ProfileContent from '../../tenantlayouts/profile_content';
import {Modal, Button , Col,AutoComplete,Cascader, notification, Slider, Row , LocaleProvider ,InputNumber, Icon, DatePicker ,  Select,Switch, Progress,  Input ,Radio} from 'antd';
import moment from 'moment';
import Agreement_modal  from '../Agreement_modal'
import 'moment/locale/en-gb';
import  apiActions from '../../tenantlayouts/durables/controllers/apiActions';
import ModalForms from '../modal_forms';
import Advert from '../../tenantlayouts/advert'
import enUS from 'antd/lib/locale-provider/en_US';
import TenantModal from '../Tenant_Modal';
import $ from 'jquery';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';

 class ProfileConfirm extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, promoted:{loading:false, error:false, results:undefined},data:{}};

    
    }
    componentWillMount(){  
   
       }
    componentDidMount(){ 
   
        
     }
     componentDidUpdate(prevProps, prevState) {


     }

    runLoadQuery (item){   
   

}
   
    showModal= (e)=> {
     $('.t-midmain').css('z-index', '30');
      var th = this;
      this.selected = e;
      console.log(e)
      console.log(th) 
      this.setState(this.css);
      th.setState({showModal :true});

    }    
    hideModal = ()=>{
     $('.t-midmain').css('z-index', '10');
     this.setState({showModal:false});
     this.setState({'css': null});
     if (this.state.ishighlighting != 'time-highlight'){
     this.setState({ishighlighting:'time-highlight'})
     setTimeout(()=>{
       this.setState({ishighlighting:''})
      },
      5000);
     }
    }


  postApplications(obj){
    console.log(obj);
    this.props.post_my_application(obj).then((it)=>{   
     let data = {};
     data.peer_id = obj.unit_manager;
     data.message = obj.leasee_first_name +" " +obj.leasee_first_name + " applied for the apartment " +obj.property;
     this.props.sendSocketPost(data);     
       notification["success"]({
          message: 'You applied for a property',
         description: 'Your appliction for  apartment '+obj.property+  ' on rentright was successful we will alert you once iportant events occour we will notify you.',
  });
    }).catch((err)=>{
       console.log(err)
          notification["error"]({
          message: 'Failed to apply',
         description: 'Your appliction was not successful please try again later or check your internet settings.',
  });
    });
  }



  
 render(){  
    if (this.props.activeUnit && this.props.activeApplication.none){
    console.log(this.props.structure , " structure");
  return (
    
    <div className = "t-md-10 t-fullheight t-white bord">
        <div className = "sieve">
        <div className = "d-left correct ">      
         <div className = "cc-lefter t-flex t-flex-row t-flex-space-between">
            <div className = "d-img2" style = { this.props.myProfile.tenants.tenant_bio.profile_picture ?  {backgroundImage:"url(" +this.props.myProfile.tenants.tenant_bio.profile_picture+ ")"}
             :  null }  /> 
             { this.props.activeUnit.unit_images.slice(0,4).map((iy,ind) =>{
                 return(
              <div className = "d-img2" style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/" +iy.id+ ")"}} ></div>
                 )
             })
             }
            </div> 

        <div className = "d-sidebar">  
        <ul>
        <li><span className = "d-sidebar-header">{this.props.auth.user.first_name} {this.props.auth.user.last_name}</span></li>  
        <li className = "applying">Applying For </li>
        <li><span className = "d-sidebar-header">{this.props.activeUnit.title}</span></li>  
        <li><span className = "">Located at {this.props.activeUnit.address.address.address}</span></li> 
         <li><span className = "">About Me {this.props.auth.user.about_me}</span></li> 
       
        </ul>
        </div>


        </div>
        <div className = "pub-right ">
            <div className = "public-profile-top ">
            <div className = "pub-m-logo"></div>
            <h1 className = "d-h1 t-center-f" style = {{marginBottom:'10px'}}>Public Profile</h1>
            <div className = "p t-center-f dp"> Your information will be sent accross as supporting documents, for this application for  {this.props.activeUnit.title}  at 
                 {this.props.activeUnit.address.address.address}, please ensure all you information is correctly represented because properly completed profile does contribute to 
                 your chances of winning the bid for lease.
            </div>
        </div>
               <div className = "pub-completion">
                   
                   { 
                       this.props.structure  ?
                        <div className = "t-md-10">

                       {
                           this.props.structure.structure.tenant_bio.length > 0  ? 
                       <div className = "t-md-10">
                       <div className = "t-md-10 t-flex t-md-10 t-flex-row t-justify-space-betweeen bgtr h-40px ">
                         <div className = "blockf">
                         <h1 className = "d-h1" style = {{fontSize:'20px'}}>Bio information</h1>
                        </div>
                        <div className = "blockf">
                        <div className = "d-btn d-a" onClick = {(e)=>this.showModal("tenant_bio")}>Edit this section</div>
                        </div>
                        </div>
                            <div className = "t-md-10 t-flex t-flex-row tjsp t-flex-wrap">
                       {  this.props.structure.structure.tenant_bio.map((item, index)=>{
                           return(
                         
                            <div className = "blockf">
                           <div className = "d-label strong"> <strong>{item.keyname} </strong></div>
                            <div className = "p">{item.value}</div>
                            </div>
                          
                             )
                    
                   
                       }) 

                       }
                         </div>
                         </div>
                         :
                         null
                       }
                     {
                           this.props.structure.structure.general_info.length > 0  ? 
                       <div className = "t-md-10">
                       <div className = "t-md-10 t-flex t-md-10 t-flex-row t-justify-space-betweeen bgtr h-40px ">
                         <div className = "blockf">
                         <h1 className = "d-h1" style = {{fontSize:'20px'}}>General information</h1>
                        </div>
                        <div className = "blockf">
                        <div className = "d-btn d-a" onClick = {(e)=>this.showModal("general_info")}>Edit this section</div>
                        </div>
                        </div>
                            <div className = "t-md-10 t-flex t-flex-row tjsp t-flex-wrap">
                       {  this.props.structure.structure.general_info.map((item, index)=>{
                           return(
                         
                            <div className = "blockf">
                           <div className = "d-label strong"> <strong>{item.keyname} </strong></div>
                            <div className = "p">{item.value}</div>
                            </div>
                          
                             )
                    
                   
                       }) 

                       }
                         </div>
                         </div>
                         :
                         null
                       }

                       {
                           this.props.structure.structure.tenant_employment_history.length > 0  ? 
                       <div className = "t-md-10">
                       <div className = "t-md-10 t-flex t-md-10 t-flex-row t-justify-space-betweeen bgtr h-40px ">
                         <div className = "blockf">
                         <h1 className = "d-h1" style = {{fontSize:'20px'}}>Emplyment History</h1>
                        </div>
                        <div className = "blockf">
                        <div className = "d-btn d-a" onClick = {(e)=>this.showModal("tenant_employment_history")}>Edit this section</div>
                        </div>
                        </div>
                            <div className = "t-md-10 t-flex t-flex-row tjsp t-flex-wrap">
                       {  this.props.structure.structure.tenant_employment_history.map((item, index)=>{
                           return(
                         
                            <div className = "blockf">
                           <div className = "d-label strong"> <strong>{item.keyname} </strong></div>
                            <div className = "p">{item.value}</div>
                            </div>
                          
                             )
                    
                   
                       }) 

                       }
                         </div>
                         </div>
                         :
                         null
                       }
                               {
                           this.props.structure.structure.tenant_residence_history.length > 0  ? 
                       <div className = "t-md-10">
                       <div className = "t-md-10 t-flex t-md-10 t-flex-row t-justify-space-betweeen bgtr h-40px ">
                         <div className = "blockf">
                         <h1 className = "d-h1" style = {{fontSize:'20px'}}>Residential History</h1>
                        </div>
                        <div className = "blockf">
                        <div className = "d-btn d-a" onClick = {(e)=>this.showModal("tenant_residence_history")}>Edit this section</div>
                        </div>
                        </div>
                            <div className = "t-md-10 t-flex t-flex-row tjsp t-flex-wrap">
                       {  this.props.structure.structure.tenant_residence_history.map((item, index)=>{
                           return(
                         
                            <div className = "blockf">
                           <div className = "d-label strong"> <strong>{item.keyname} </strong></div>
                            <div className = "p">{item.value}</div>
                            </div>
                          
                             )
                    
                   
                       }) 

                       }
                         </div>
                         </div>
                         :
                         null
                       }


                     {
                        this.props.structure.structure.tenant_immigration_history.length > 0  ? 
                       <div className = "t-md-10">
                       <div className = "t-md-10 t-flex t-md-10 t-flex-row t-justify-space-betweeen bgtr h-40px ">
                         <div className = "blockf">
                         <h1 className = "d-h1" style = {{fontSize:'20px'}}>Immigration History</h1>
                        </div>
                        <div className = "blockf">
                        <div className = "d-btn d-a" onClick = {(e)=>this.showModal("tenant_immigration_history")}>Edit this section</div>
                        </div>
                        </div>
                            <div className = "t-md-10 t-flex t-flex-row tjsp t-flex-wrap">
                       {  this.props.structure.structure.tenant_immigration_history.map((item, index)=>{
                           return(
                         
                            <div className = "blockf">
                           <div className = "d-label strong"> <strong>{item.keyname} </strong></div>
                            <div className = "p">{item.value}</div>
                            </div>
                          
                             )
                    
                   
                       }) 

                       }
                         </div>
                         </div>
                         :
                         null
                       }


















                      </div>




                      
                       :
                       null
                   }
                     {this.state.showModal ? <ModalForms selected = {this.selected} hideModal = {this.hideModal}/> :null}
                   </div>
            </div>
        <div className = "t-md-2 t-flex-column smp t-flex">
        <Progress type="circle" status = {this.props.myProfile.tenants.completed < 50 ? "exception" : null} percent = {this.props.myProfile.tenants.completed} />
        <span className = "d-h1 zero-marg less">Profile completion score </span>
        <div className = "t-md-10 t-flex  t-flex-column t-justify-center t-align-center t-align-content-center" style = {{marginTop:'40px'}}>
           
           {
           
            !this.props.applicationsPostIndicator.Loading &&  !this.props.applicationsPostIndicator.Error && !this.props.activeUnit.applied &&  this.props.applicationsPost &&  !this.props.applicationsPost.success
            ?
            <div className = "d-btn d-a"
                        onClick = { (e)=>this.postApplications({units:this.props.activeUnit.id,
                            unit_tenant:this.props.auth.user.id,
                            unit_manager:this.props.activeUnit.unit_manager ,
                            leasee_first_name:this.props.auth.user.first_name,
                            leasee_last_name:this.props.auth.user.last_name,
                            property:this.props.activeUnit.title})} >
                <Icon type = "check" style = {{marginRight:'10px'}}/>
                <span>Apply for this Unit</span>
            </div>
             :
                !this.props.activeApplication.none ||  this.props.applicationsPost && this.props.applicationsPost.success 
                ?
             <div className = "mnapply">                      
                <Icon type = "clock-circle"/>
                <span>You Applied For this Property</span>
            </div>
                :
            this.props.applicationsPostIndicator && this.props.applicationsPostIndicator.Loading    &&  !this.props.applicationsPost.success    && !this.props.activeUnit.applied          
            ?
            <div className = "mnapply">                      
                <Icon type = "loading"/>
                <span>Applying For property</span>
            </div>
            :
            this.props.applicationsPostIndicator && !this.props.applicationsPostIndicator.Loading && this.props.applicationsPost.Error
            ?
         <div className = "mnapply errorapply"
                        onClick = { (e)=>this.postApplications({units:this.props.activeUnit.id,
                            unit_tenant:this.props.auth.user.id,
                            unit_manager:this.props.activeUnit.unit_manager ,
                            leasee_first_name:this.props.auth.user.first_name,
                            leasee_last_name:this.props.auth.user.last_name,
                            property:this.props.activeUnit.title})} >                      
            <Icon type = "close-circle"/>
                <span>Error Aply again</span>
            </div>
            :
            null
            }
            {
               !this.props.activeApplication.none ||  this.props.applicationsPost && this.props.applicationsPost.success 
                ?
                <div className = "t-md-10 t-flex t-flex-column">                
                <p className = "p  t-center-f t-flex t-flex-column"> 
                    <h1 className = "strong t-center-f">Your Application was successful</h1>
                    You can sit back and we will duly notify you if and when you application as being accepted or rejected as the case may be </p>
                <NavLink to = "/tenant/profile" style = {{marginTop:'40px', width:'100%'}} > <div className = "d-btn d-a">Go back to your profile</div></NavLink>
                     <h1 className = "strong t-center-f" style= {{marginTop:'50px', marginBottom:'30px'}}>Share this experience on facebook</h1>

                     <div className = "t-md-10 t-flex t-flex-center t-justify-center">
                        <FacebookShareButton
                            url="https://rentright.herokuapp.com"
                            quote="Rentright"
                            className="Demo__some-network__share-button"
                           title = {this.props.auth.first_name + "  just applied for a property on rent right"}
                         description  = "Rentright is a platform where landlords and tenants can come together and dash dash dash dash"
                         picture = {"https://rentright-api-gateway.herokuapp.com/user/units/image/" + this.props.activeUnit.unit_images[0].id}>
                            <FacebookIcon
                            size={32}
                            round />
                          </FacebookShareButton>
                       </div>
                
                </div>
                   :
                null
               }
               
            </div>
        </div>
       </div>     
      </div>
      )
    }else{
        console.log('nothing was loaded heere')
          this.context.router.history.push("/tenant/profile"); 
          return  null        
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
        loader: state.tenantProfileLoader,
        form:state.getform.data,
        formBreakDownData:state.formBreakDownData.content,
        structure:state.structure,
        queryIndicator:state.query_indicator,
        applicationsIndicator:state.applications_indicator,
        applicationsPostIndicator:state.applications_post_indicator,
        queryResult:state.query_result,
        myApplications: state.applications_result,
        applicationsPost: state.tenant_post_applications,   
        activeUnit: state.ApplicationDetails.currentUnit,
        activeApplication: state.ApplicationDetailsApp.currentApplication
  
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    update: patchSpecificTenant,
    showLoading:showLoading,
    errorLoading:errorLoading,
    hideLoading:hideLoading,
    getFormStruct: getFormStruct, 
     loadStructure: getProfileStruct,
    breakFormToComponents:breakFormToComponents,
    loadMyQuery: load_my_query,
    loadMyApplications: load_my_applications,
    post_my_application:post_my_application,
    sendSocketPost:sendSocketPost,
    setActiveUnit : setCurrentUnitFunc,
    setActiveApp : setCurrentApplicationFunc,
  }, dispatch);
}

ProfileConfirm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
ProfileConfirm.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(ProfileConfirm)
