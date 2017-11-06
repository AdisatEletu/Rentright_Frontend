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
import {Modal, Button , Col,AutoComplete,Cascader,TimePicker, notification, Slider,  Calendar ,  Row , LocaleProvider ,InputNumber, Icon, DatePicker ,  Select,Switch, Progress,  Input ,Radio} from 'antd';
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


export default class LeaseSigningForm extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, time:null, date:null, promoted:{loading:false, error:false, results:undefined},data:{}};   
         this.onPanelChange = this.onPanelChange.bind(this); 
         this.onChange = this.onChange.bind(this);
         this.setInspection = this.setInspection.bind(this);
    }
    componentWillMount(){ 
          
   
       }
    componentDidMount(){    
        this.setState({ })
     }
     componentDidUpdate(prevProps, nextState) {
          if(nextState.update){

          }

     }

    runLoadQuery (item){   
   

}

  
 render(){  
  return (
            <div className = "t-md-10 t-full-height ">
            
                   { this.props.update ?
                 <div className = "mnapply t-md-2" style = {{marginTop:'auto', marginLeft:'auto'}}><Icon type = "paper-clip"/>Sign Lease agreement </div>
                 :
                 null}
            </div>
      )
    }
   
                   
        
     }
 



LeaseSigningForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
LeaseSigningForm.contextTypes = {
        router: PropTypes.object.isRequired,
    }


