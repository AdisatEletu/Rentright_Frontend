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
const LinkedinIcon = generateShareIcon('linkedin');
const TwitterIcon = generateShareIcon('twitter');
const GoogleIcon = generateShareIcon('google');
const WhatsaooIcon = generateShareIcon('whatsapp');
var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';

 export default class RightPanel extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, promoted:{loading:false, error:false, results:undefined},data:{}};

    
    }
    componentWillMount(){  
   
       }
    componentDidMount(){ 
   
        this.setState({
            profilePicture: this.props.myProfile.tenants.tenant_bio.profile_picture ?  this.props.myProfile.tenants.tenant_bio.profile_picture : "",
            displayPicture1: this.props.activeUnit && this.props.activeUnit.unit_images[0]  ?  "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"  + this.props.activeUnit.unit_images[0].id: '',
            displayPicture2: this.props.activeUnit && this.props.activeUnit.unit_images[2]   ?  "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"  + this.props.activeUnit.unit_images[1].id: '',
            displayPicture3: this.props.activeUnit.unit_images[2]  && this.props.activeUnit ?  "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"  + this.props.activeUnit.unit_images[2].id: '',
    
    })
     }
    

   
  postApplications(obj){
   this.props.postApplications(obj);
  }
  
 render(){  
  return (    
     <div className = "t-md-10 t-fullheight t-flex t-flex-column t-align-content-center t-align-center">
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
             <NavLink to = "/tenant/profile" className = "mnapply">                      
                <Icon type = "clock-circle"/>
                <span>Go to profile</span>
            </NavLink>
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
            <div className = "t-md-10">
                 <div className = "share-page" >
                <div className = "share-page-display" style = {{backgroundImage:'url('+this.state.displayPicture1 ? this.state.displayPicture1: "" +')' }}>
                    <div className = "scover">
                            </div>
                       </div>
                    <div className = "share-pre-band">
                    <div className = "sprofile" style =  {{backgroundImage:"url(" +this.props.myProfile.tenants.tenant_bio.profile_picture+ ")"}}/>
                    <div className = "shyphen"><i>"Hey i just aplied for rent on rentright... "</i></div>
                    <h1>
                     <div className = "t-md-10 t-flex t-flex-center t-justify-space-around" style = {{marginBottom:'15px'}}>
                        <FacebookShareButton
                            url="https://rentright.herokuapp.com"
                            quote="Rentright"
                            className="Demo__some-network__share-button"
                           title = {this.props.auth.user.first_name + "  just applied for a property on rent right"}
                         description  = "Rentright is a platform where landlords and tenants can come together and dash dash dash dash"
                         picture = {"https://rentright-api-gateway.herokuapp.com/user/units/image/" + this.props.activeUnit.unit_images[0].id}>
                            <FacebookIcon
                            size={32}        
                            round />
                          </FacebookShareButton>
                        <LinkedinShareButton
                            url="https://rentright.herokuapp.com"
                            quote="Rentright"
                            className="Demo__some-network__share-button"
                           title = {this.props.auth.user.first_name + "  just applied for a property on rent right on " +this.props.activeUnit.address.address.address}
                         description  = "Rentright is a platform where landlords and tenants can come together and dash dash dash dash"
                         picture = {"https://rentright-api-gateway.herokuapp.com/user/units/image/" + this.props.activeUnit.unit_images[0].id}>
                            <LinkedinIcon
                            size={32}        
                            round />
                          </LinkedinShareButton>
                        <WhatsappShareButton
                            url="https://rentright.herokuapp.com"
                            quote="Rentright"
                            className="Demo__some-network__share-button"
                           title = {this.props.auth.user.first_name + "  just applied for a property on rent right"}
                         description  = "Rentright is a platform where landlords and tenants can come together and dash dash dash dash"
                         picture = {"https://rentright-api-gateway.herokuapp.com/user/units/image/" + this.props.activeUnit.unit_images[0].id}>
                            <WhatsaooIcon
                            size={32}        
                            round />
                          </WhatsappShareButton>
                        <TwitterShareButton
                            url="https://rentright.herokuapp.com"
                            quote="Rentright"
                            className="Demo__some-network__share-button"
                           title = {this.props.auth.user.first_name + "  just applied for a property on rent right"}
                         description  = "Rentright is a platform where landlords and tenants can come together and dash dash dash dash"
                         picture = {"https://rentright-api-gateway.herokuapp.com/user/units/image/" + this.props.activeUnit.unit_images[0].id}>
                            <TwitterIcon
                            size={32}        
                            round />
                          </TwitterShareButton>
                         <GooglePlusShareButton
                            url="https://rentright.herokuapp.com"
                            quote="Rentright"
                            className="Demo__some-network__share-button"
                           title = {this.props.auth.user.first_name + "  just applied for a property on rent right"}
                         description  = "Rentright is a platform where landlords and tenants can come together and dash dash dash dash"
                         picture = {"https://rentright-api-gateway.herokuapp.com/user/units/image/" + this.props.activeUnit.unit_images[0].id}>
                            <GoogleIcon
                            size={32}        
                            round />
                          </GooglePlusShareButton>
                        

                       </div>
                    

                    <span>Earn rentright badge</span>
                    <div className = "t-md-8 preborder">
                    </div>
                    <p className = "pie">Share your eperiences on rentright with on your  social media,  and earn yourself a rentright badge which comes with its benefits.</p>
                    </h1>
                
                     </div>
                     
                
                    <div className = "share-band">
                        <div className = "share-image"/>
                        <div className = "share-talk">
                            </div>

                        </div>
            </div>
            </div>
            :
            null
            }
             
            </div>
        </div>
         )
    }             
                 
        
     }



RightPanel.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
RightPanel.contextTypes = {
        router: PropTypes.object.isRequired,
    }


