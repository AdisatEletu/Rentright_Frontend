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
import { loadAllTenants, loadSpecificTenant,post_my_application,  load_my_query, load_my_applications,  sendSocketPost,patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
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
import Agreement_modal  from './Agreement_modal.js'
import 'moment/locale/en-gb';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Slider, Row } from 'antd';
import TenantModal from './Tenant_Modal';
import $ from 'jquery';
import { notification } from 'antd';
var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';

 class TenantApplications extends Component{
    constructor(props) {           
      super(props) 
      this.k;
      this.state ={ showModal:false }
      this.frontimage = null;
      this.listimage = [];
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.postApplications = this.postApplications.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this); 
       this.showModal = this.showModal.bind(this);
       this.hideModal = this.hideModal.bind(this);
        this.uuid = this.props.auth.user.uuid;   
        console.log(this.uuid);
        this.hideModal = this.hideModal.bind(this);   
        this.css = {'transform': 'scale(0.2, 0.2)' }
       this.sendobj = {};
      this.props.loadMyApplications(this.uuid +'/').then((res)=>{
        console.log(res);
     if (this.props.myApplications.applications && this.props.myApplications.applications.length > 0 ){
      this.props.myApplications.applications.map((item)=>{
        this.props.loadMyQuery('units='+item.units).then((res)=>{
        console.log(res);
      }) 
        
      })

       }
      })

    }
       componentWillMount(){        
      
     }
    componentDidMount(){ 

     }
     componentDidUpdate(prevProps, prevState) {


     }
   
/*handleSubmit = ()=>{
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
      this.setState({showModal:false});       
      })
       path += "&" +"uuid="+this.props.auth.user.uuid;
      console.log(path);
      this.props.loadMyQuery(path).then((res)=>{
        console.log(res);
      })

    }

  }*/

    showModal= ()=> {
     $('.t-midmain').css('z-index', '30');
     $('.midpictures').css('z-index', '1');
      var th = this;
      console.log(th) 
      this.setState(this.css);
      th.setState({showModal :true});

    }    
    hideModal = ()=>{
     $('.t-midmain ').css('z-index', '10');
    $('.midpictures').css('z-index', '5000');
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
         description: 'Your appliction for  apartment '+obj.property+  ' on rentright was successful we will alert you once important events occour we will notify you.',
  });
    }).catch((err)=>{
       console.log(err)
          notification["error"]({
          message: 'Failed to apply',
         description: 'Your appliction was not successful please try again later or check your internet settings.',
  });
    });


  }
   hideModal(){
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
    showModal= (frontimage, listimage, item)=> {
     $('.t-midmain').css('z-index', '30');
     this.frontimage = frontimage;
     this.listimage = listimage;
      var th = this;
      console.log(th)
      console.log(th.state)
      this.setState(this.css);
      th.setState({showModal :true, item});
      setTimeout(()=>{
        this.css = {'transform':'scale(1,1)' };
        this.setState(this.css);
        console.log(this.css);
      }, 100);

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
   let  path  ='https://rentright.herokuapp.com/api/rentright/tenants/applications/'+this.props.auth.user.uuid;
    console.log(path);
      this.props.loadMyQuery(path).then((res)=>{
        console.log(res);
      })

    }

  
 render(){ 
    

  return (
  this.props.queryResult  && this.props.queryResult.results  && this.props.queryResult.results.units.length > 0 ? 
<div className = "t-fullheight t-md-10">
<div className = "cwall under">
<div className = "t-flex zoomeffect wallpaper"   style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+this.props.queryResult.results.units[0].unit_images[1].id+ ")"}}>
<div className = "wallpapercover opacityeffect">
  <div className = "kings">
  <div className = "westeros"><span>{this.props.queryResult.results.units[0].unit_type.replace('_', ' ' )}</span><span>{ this.props.queryResult.results.units[0].bedrooms + " bedrooms"}</span></div>
  <div className = "knight">
  <div className = "wallh1">{this.props.queryResult.results.units[0].title}</div>
  </div>
  </div>
<div className = "watch t-flex t-align-top t-justify-right">
  <div className = "whitewalkers">
    <div className = "kingslanding-top t-flex t-flex-column t-justify-center">
      <span className = "thinlanisters">Monthly Price</span>
      <span className = "deeplanisters"> {"N " + this.props.queryResult.results.units[0].monthly_rent }</span>
      </div>
     <div className = "kingslanding-mid t-flex t-justify-center"><span className = "deeplanisters smx">Status <span className = "thinlanisters smx">Application Sent</span></span> </div>
      <div className = "kingslanding-bottom t-flex t-align-center t-justify-center"><span className = "lanisters lgx">Application</span></div>
  </div>
</div>
</div>
</div>
</div>
<div className = "t-flex t-flex-row t-md-10">
<div className = "midpictures upeffect">
  { this.props.queryResult.results.units[0].unit_images.map((obj, ind)=>{
    return(
    <div className = "pictures-got" key = {ind} style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+ obj.id}}>
    <div className = "wallpapercover"></div>
    </div>
    )
  })

  }  
  </div>  
  <div className = "middialog upeffect"> 
      <div className = "whitewalkers iconify">
    <div className = "kingslanding-top t-flex t-flex-column t-justify-center">
      <span className = "thinlanisters">Lease Agreeement</span>
      <span className = "deeplanisters">From landlord</span>
      </div>
      <div  className = "ic"><Icon type = "user"/></div>
     <div className = "kingslanding-mid t-flex t-justify-center"><span className = "deeplanisters smx">Status <span className = "thinlanisters smx">Checkout lease </span></span> </div>
      <div className = "kingslanding-bottom t-flex t-align-center t-justify-center purp" onClick = {this.showModal}><span className = "lanisters lgx">Checkout</span></div>
  </div>

  </div>
  </div>
     {this.state.showModal ? <Agreement_modal hideModal = {this.hideModal}/> :null}
</div> 
  :
  null
      
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
        applicationsPostIndicator:state.applications_post_indicator,
        queryResult:state.query_result,
        myApplications: state.applications_result,
        applicationsPost: state.tenant_post_applications,   
  
 
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
    sendSocketPost:sendSocketPost
  }, dispatch);
}

TenantApplications.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
TenantApplications.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(TenantApplications)
