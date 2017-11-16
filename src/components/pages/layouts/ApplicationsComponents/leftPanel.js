import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import FormElements  from '../../tenantlayouts/form_elements';
import ProfileContent from '../../tenantlayouts/profile_content';
import {Modal, Button , Col,AutoComplete,Cascader, notification, Slider, Row , LocaleProvider ,InputNumber, Icon, DatePicker ,  Select,Switch, Progress,  Input ,Radio} from 'antd';
import moment from 'moment';
import 'moment/locale/en-gb';
import  apiActions from '../../tenantlayouts/durables/controllers/apiActions';
import enUS from 'antd/lib/locale-provider/en_US';
import TenantModal from '../Tenant_Modal';
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';
 const classes = "d-sidebar-header m-ellipses m-thick ";
 export default class RightPanel extends Component{
    constructor(props) {  
    super(props) 
        
         this.state = {loading:false, showModal:false, promoted:{loading:false, error:false, results:undefined},data:{}};
         this.selectMode = this.selectMode.bind(this);   
         this.setMyRouter = this.setMyRouter.bind(this);
               
        }
    setMyRouter(item){  
        let obj = {}
        switch(item){
            case "profile":
                obj.profile = classes + "m-editing ";
                obj.inspection = classes + "m-optional ";
                obj.lease = classes;
                obj.pay = classes;
                obj.beginLease = classes;
                obj.maintainance = classes;
            break;
            case "inspetion":
                obj.profile = classes + " m-thick-done";
                obj.inspection = classes + "m-optional m-editing";
                obj.lease = classes;
                obj.pay = classes;
                obj.beginLease = classes;
                obj.maintainance = classes;
            break;
            case "lease":
                obj.profile = classes + "m-thick-done ";
                obj.inspection = classes + "m-thick-done ";
                obj.lease = classes + "m-editing ";
                obj.pay = classes;
                obj.beginLease = classes;
                obj.maintainance = classes;
            break;
            case "pay":
                obj.profile = classes + "m-thick-done";
                obj.inspection = classes + "m-thick-done";
                obj.lease = classes + "m-thick-done" ;
                obj.pay = classes + "m-editing";
                obj.beginLease = classes;
                obj.maintainance = classes;
            break;
            case "beginLease":
                obj.profile = classes + "m-thick-done";
                obj.inspection = classes + "m-thick-done";
                obj.lease = classes + "m-thick-done";
                obj.pay = classes + "m-thick-done";
                obj.beginLease = classes + "m-editing";
                obj.maintainance = classes;
            break;
            case "maintainance":
                obj.profile = classes + "m-thick-done";
                obj.inspection = classes + "m-thick-done";
                obj.lease = classes + "m-thick-done";
                obj.pay = classes + "m-thick-done";
                obj.beginLease = classes + "m-thick-done";
                obj.maintainance = classes + "m-editing";
            break;
            default:
             obj.profile = classes + "m-editing";
             obj.inspection = classes + "m-optional";
             obj.lease = classes;
             obj.pay = classes;
             obj.beginLease = classes;
             obj.maintainance = classes;


        }
         this.setState(obj)
       }
    componentWillMount(){ 
        this.setMyRouter('default');  
          
     }
  selectMode=(item)=>{
      
     this.props.selectMode(item);
     this.setMyRouter(item);
  }     
  postApplications(obj){
   this.props.postApplications(obj);
  }
  
 render(){  
  return (    
     <div className = "t-md-10 t-fullheight">
         <div className = "d-sidebar">  
                <h1 className = "d-h1">Rent Process</h1>
                <ul>
                 <li className = "li" onClick = {()=>this.selectMode('profile')}><span className = {this.state.profile }><Icon type = "ellipsis"/>Send your profile</span></li>  
                   <li className = "li" onClick = {()=>this.selectMode('inspection')}><span className ={this.state.inspection}><Icon type = "double-right"/>Schedule Inspection</span></li>                 
                 <li className = "li" onClick = {()=>this.selectMode('lease')}><span className = {this.state.lease}><Icon type = "double-right"/>Ascent to Lease Agreement</span></li>  
                 <li className = "li" onClick = {()=>this.selectMode('pay')}><span className ={this.state.pay}><Icon type = "double-right"/>Pay initial rent deposit</span></li>  
                 <li className = "li" onClick = {()=>this.selectMode('beginLease')}><span className ={this.state.beginLease}><Icon type = "double-right"/>Begin lease</span></li> 
                   <li className = "li" onClick = {()=>this.selectMode('maintainance')}><span className = {this.state.maintainance}><Icon type = "double-right"/>Request for maintenance</span></li>  
                 </ul>   

                </div> 
             
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


