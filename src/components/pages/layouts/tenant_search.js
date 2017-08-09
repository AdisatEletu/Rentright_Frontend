import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
import {NavLink} from 'react-router-dom';
import CircleLinks from '../tenantlayouts/circle_links';
import {bindActionCreators} from 'redux';  
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import FormElements  from '../tenantlayouts/form_elements';
import NewForm  from '../tenantlayouts/new_form';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
import Spin from  'antd/lib/spin';
import Button from'antd/lib/button';
import ProfileContent from '../tenantlayouts/profile_content';
import Modal from 'antd/lib/modal';
import Progress from 'antd/lib/progress';
import Radio from  'antd/lib/radio';
import  Input from 'antd/lib/input';
import moment from 'moment';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import  DatePicker from 'antd/lib/date-picker'; 
import  AutoComplete from 'antd/lib/auto-complete';
import  Cascader from 'antd/lib/cascader';
import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
import Select from 'antd/lib/select'
import 'moment/locale/en-gb';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Slider, Row } from 'antd';


var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';

 class TenantSearch extends Component{
    constructor(props) {           
       super(props) 
     // this.state = {obj2:{}};       
      ////this.props.getFormStruct();       
      this.state ={}
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this); 
        this.uuid = this.props.auth.user.uuid;   
        console.log(this.uuid);
        this.hideModal = this.hideModal.bind(this);   
       this.sendobj = {};
       //.then(()=>{

    }
       componentWillMount(){ 
       
      
     }
    componentDidMount(){  


     }
     componentDidUpdate(prevProps, prevState) {

     }
   

   hideModal(){
     this.setState({showModal:false});
     if (this.state.ishighlighting != 'time-highlight'){
     this.setState({ishighlighting:'time-highlight'})
     setTimeout(()=>{
       this.setState({ishighlighting:''})
      },
      5000);
     }else{
  
     }
   } 
   handleInputChange(event) {
  
    var th = this;
    const target = event.target;
    const value = target.type === 'radio' ? target.selected : target.value;
    const name = target.name;
    if (value && value != ''){
      th.sendobj[name]  = value ;
    this.setState({
      [name]: value
    });
    }
    console.log(this.state);
 
  } 
  handleSubmit = ()=>{
    var th = this; 
    th.sendobj.uuid = this.props.match.params.id;
    console.log(this.sendobj);
    console.log( '/'+this.props.match.params.id);
    this.props.showLoading();
    this.setState({showModal:true});
    console.log(this.props.loader)
    console.log('loaging value of loading')
    let newobj = {uuid:this.props.match.params.id, tenant_residence_history:[this.sendobj]}
    this.props.update( '/'+this.props.match.params.id,newobj).then((data)=>{
    //   this.context.router.history.push("/tenant/profile/bioinfo/" + this.props.match.params.id);
    this.props.loadStructure('/profile/structure/?uuid='+this.uuid, true)
   
    })
  }
 render(){               
         return (
<div className = "t-flex t-md-10 t-flex-column t-fullheight">
<div className = "q-head  t-flex-column t-justify-left">
    <div className = "q-h1 t-left-f">Are you ready to find your home ? </div>
    <div className = "q-h2 t-lfet-f">Please use the options provided below and select a query parameter..</div>
</div>
<div className = "p-widget t-md-10 t-flex-column padsmall q-blue ">
  <div className = "t-md-10 q-h11">You can select any combination of parameters</div>
<div className = "q-column t-md-10 t-flex padsmall  t-fullheight t-flex-row">
<div className = "t-flex t-md-3 t-flex-column t-fullheight q-bright">
<div className = "t-flex t-md-10 t-flex-column">
  <span className = "span">Search By Place</span>
 <Input  prefix={<Icon type="tag" />}  size = "large"  name = "name" onChange = {this.handleInputChange}   placeholder = "Search by place ..." />  
</div>
<div className = "t-flex t-md-10 t-flex-column">
  <span  className = "span">Search By Space</span>
   <InputGroup size="large"><Col span={4}><Input defaultValue="FT" /> </Col> <Col span={20}> <InputNumber defaultValue="" placeholder = "Square Footage"   name = "footage" onChange = {this.handleInputChange}   /> </Col> </InputGroup>

</div>
</div>
<div className = "t-flex t-md-3 t-fullheight q-bright">
<div className = "t-flex t-md-10 t-flex-column">
   <span  className = "span">Max Cost</span>
  <Row>
<Col span={18}>
          <Slider min={10000} max={2000000000000} step={10000}  value = {this.state.rent ? this.state.rent : 0} onChange = {this.handleInputChange}  />
        </Col>
        <Col span={3}>
          <InputNumber
            min={1}
            max={2000000000000}
            style={{ marginLeft: 1 }}
             name = "rent" value = {this.state.rent ? this.state.rent : 0} onChange = {this.handleInputChange} step={10000}
            />
        </Col>
</Row>
  <span  className = "span">Number of rooms</span>
     <Col span={15}> <InputNumber  min={1} placeholder = "Number of rooms"   name = "bedrooms" onChange = {this.handleInputChange} max={20} /></Col>
 




</div>

</div>
<div className = "t-flex t-md-4 t-fullheight q-bright">
<div className = "t-flex t-md-10 t-flex-column">

</div>
</div>

</div>

</div>

</div>    
      
      
      
         )
              
                 
        
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
    breakFormToComponents:breakFormToComponents
  }, dispatch);
}

TenantSearch.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
TenantSearch.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(TenantSearch)
