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
import { loadAllTenants, loadSpecificTenant, load_my_query, load_my_applications, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
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
import Select from 'antd/lib/select';

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
      this.k;
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
   handleInputChange(event, name = null) {
  
    var th = this;
    let value; 
    let target;
    if (! name){
    try{
    target = event.target;
    value = target.type === 'radio' ? target.selected : target.value;
    name = target.name;
    }catch(err){
      value = event;
    }
  
    }
  else{
    value = event
  }

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
    if (this.state !== {}) {
      let path = ""
      let keys = Object.keys(this.state)
      let lis = keys.map((item)=>{
        console.log(item)
        if (path == ""){
          path = item + "="+this.state[item];
        }else{
          path  += "&" +item + "="  + this.state[item] 
        }
        
        
      })
      console.log(path);
      this.props.loadMyQuery(path).then((res)=>{
        console.log(res)
      })

    }

  }
 render(){  
  /*if (!this.state)  */ 

   return (
<div className = "t-flex t-md-9 t-flex-column t-fullheight t-white please-dont-shrink">
<div className = "q-head  t-flex-column t-justify-left q-sub">
    <div className = "q-h1 t-left-f">Are you ready to find your home ? </div>
    <div className = "q-h2 t-lfet-f">Please use the options provided below and select a query parameter..</div>
</div>
<div className = "p-widget t-md-10 t-flex-column padsmall q-blue ">
  <div className = "t-md-10 q-h11"><span>QUICK SEARCH : </span>You can select any combination of parameters</div>
<div className = "q-column t-md-10 t-flex padsmall  t-fullheight t-flex-row">
<div className = "t-flex t-md-3 t-flex-column t-fullheight q-bright">
<div className = "t-flex t-md-10 t-flex-column">
  <span className = "span">Search By Place</span>
 <Input  prefix={<Icon type="tag" />}  size = "large"  name = "name" onChange = {this.handleInputChange}   />  
</div>
<div className = "t-flex t-md-10 t-flex-column">
  <span  className = "span">Search By Space</span>
    <InputNumber defaultValue="" name = "footage" style={{ width: 180 }}  onChange = {(e)=> this.handleInputChange(e,'footage')}    />

</div>
</div>
<div className = "t-flex t-md-4 t-fullheight q-bright">
<div className = "t-flex t-md-10 t-flex-column">
   <span  className = "span">Max Cost</span>
  <Row>
<Col span={18}>
          <Slider min={10000} max={2000000000000} step={10000}  value = {this.state.rent ? this.state.rent : 0} onChange = {(e)=> this.handleInputChange(e,'rent')}  />
        </Col>
        <Col span={3}>
          <InputNumber
            min={1}
            max={2000000000000}
            style={{ marginLeft: 5 }}
             name = "rent" value = {this.state.rent ? this.state.rent : 0}  onChange = {(e)=> this.handleInputChange(e,'rent')}  step={1000}
            />
        </Col>
</Row>
  <span  className = "span">Number of rooms</span>
     <Col span={15}> <InputNumber  min={1}  name = "bedrooms" style={{ width: 50 }}  onChange = {(e)=> this.handleInputChange(e,'bedrooms')}  max={20} /></Col>
 




</div>

</div>
<div className = "t-flex t-md-4 t-fullheight q-bright">
<div className = "t-flex t-md-10 t-flex-column">
<span className = "span">Minimum Lease term (Months)</span>
 <InputNumber defaultValue=""  style={{ width: 180 }} name = "minimum_lease"  onChange = {(e)=> this.handleInputChange(e,'minimum_lease')}  />
 <span className = "span">Search For Apartments</span>
 <div className = "t-flex t-flex-row t-md-5 t-justify-right">
   { this.props.queryIndicator ? this.props.queryIndicator.Loading ?
       <Button type="primary" loading= {true}>Loading ...</Button>
           :  
        <Button type="default" icon="download"  onClick={this.handleSubmit} size="default">Find</Button>
        :
        null
   }

   </div>
</div>
</div>

</div>

</div>

<div className = "q-body p-widget">
{
  this.props.queryIndicator ? this.props.queryIndicator.Loading ?  
<div className = "t-md-10 t-justify-center t-align-center t-full-height t-sup-h1">
 <span className = "t-center-f t-md-10"><Icon  type = "loading" /></span>
</div>
: 
this.props.queryIndicator.Error ? 
<div className = "toppadsm t-md-10">
<div className = "q-h1sm t-md-10 t-center-f"><Icon type = "bell"/>&nbsp;Could not find any property </div>
<div className  = "t-md-10 t-fullheight q-h11sm t-center-f">Sorry yor search parameter returned no result, endeavour to moderate your parameters and search again, should you not find what your are looking for, we will alert you when a property turns up matching your criteria </div>
</div>
 : 
this.props.queryResult.results ? 
<div className = "q-results-pane">
  <div className = "q-breadcrumbs">
    <div className = "q-b t-fullheight">
     <div className = "q-border-right q-act">{this.props.queryResult.results.units.length} Results Returned &nbsp;<Icon type = "down"/></div>
    <div className = "q-border-right q t-flex t-align-center t-justify-space-around">
      <span className = "t-h3">Results&nbsp;&nbsp;&nbsp;&nbsp;</span>
    {
         Object.keys(this.state).map((item, k)=>{
          return(
           <span key = {item}>&nbsp;&nbsp;<strong className = "open-sans">{item}</strong> : {this.state[item]}</span>
          )
            })


    }
    </div>
    </div>

  </div>
  {this.props.queryResult.results.units.map((itemm,i)=>{
     return(
      <div key= {i}className = "q-results"> 
       <div className = "q-image" style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id+ ")"}}>
       {/* <div className = "q-image" style = {{backgroundImage:"url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"}}>*/}
      <div className= "q-image-cover t-md-10 t-fullheight"><div className = "btn"> <Icon type = "export"/>&nbsp;Explore Property</div></div>
       </div>
        <div className = "q-exp t-flex t-flex-column">
          <div className = "q-header">{itemm.description}</div>
          <div className = "q-head-sub">{itemm.title}</div>
            {/*
            
            Object.keys(itemm).slice(4,10 ).map((it, k)=>{
              console.log(typeof(itemm[it]))
              if ( typeof(itemm[it]) !== "object" && typeof(itemm[it]) !=="number"  ){
               console.log(it)
              return(
              <div key = {it} className ="q-item-key"><span className = "q-key">{it.replace('_', ' ' )}</span><span className = "q-item">{itemm[it]}</span></div> 
              )
              */}
              <div className = "q-item-key q-others">Get this nice apartment, a {itemm.bedrooms} bedroom apartment, located in {itemm.title} .Rent goes for 
               {itemm.monthly_rent}, with a minimum lease of {itemm.minimum_lease_term} months, the apartment is fitted with a {itemm.parking_type} parking type,
               and total of {itemm.bathrooms} bathrooms.
               </div>
                 <div className = "t-md-3 q-show">
                   { itemm.unit_images.map((me, kin)=>{
                     return(
                   <div className = "q-pics"  key = {kin} style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+me.id+ ")"}}></div>
                     )
                   })
                   }

                   </div>

              
               <div className= "t-flex t-m-top t-flex-column t-flex-justify">





               <div className = "q-initial t-flex t-flex-row t-align-bottom">
                 <span><Icon type = "down-square-o"/>&nbsp;{itemm.bedrooms}&nbsp; Bathrooms</span>
                  <span><Icon type = "shop"/>&nbsp;{itemm.bathrooms}&nbsp; Bedrooms</span>
                 <span><Icon type = "car"/>&nbsp;{itemm.parking_type}&nbsp; Parking Type</span>
               </div>
                <div className = "q-breadcrumbs q-bord t-flex t-justify-right">
                <div className = "q-b t-fullheight  t-flex t-justify-right">
               <div className = "q-border-right  t-flex t-align-center t-justify-space-around f-q ">
                     Contact&nbsp; <Icon type = "down"/>
                     </div>
            <div className = "q-border-right  t-flex t-align-center t-justify-space-around f-q ">
                     Explore&nbsp; <Icon type = "switcher"/>
                     </div>
                   <div className = "q-border-right q-act t-flex t-align-center t-justify-space-around f-q fr">
                     Apply&nbsp; <Icon type = "export"/>
                     </div>

               </div>
                </div>
                 </div>
            })
          }
        </div>
        </div> 
     )
  })
  }
</div>
 :
 null
 :
 null
 


}

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
        queryIndicator:state.query_indicator,
        applicationsIndicator:state.applications_indicator,
        queryResult:state.query_result,
        applicationsResult: state.applications_result        
 
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
    loadMyApplications: load_my_applications
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
