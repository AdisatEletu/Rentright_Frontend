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

var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';

export default class ApplicationsConfirm extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, promoted:{loading:false, error:false, results:undefined},data:{}};    
    }
    componentWillMount(){  
   
       }
    componentDidMount(){    
        this.setState({ })
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


  
 render(){  
  return (
            <div className = "t-md-10 t-full-height ">
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
      )
    }
   
              
                 
        
     }
 



ApplicationsConfirm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
ApplicationsConfirm.contextTypes = {
        router: PropTypes.object.isRequired,
    }


