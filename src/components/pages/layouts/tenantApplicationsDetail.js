import React, {Component} from 'react';
import {Switch,Route,} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
import {Link} from 'react-router-dom';
import CircleLinks from '../tenantlayouts/circle_links';
import {bindActionCreators} from 'redux';  
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import FormElements  from '../tenantlayouts/form_elements';
import NewForm  from '../tenantlayouts/new_form';
import { loadAllTenants, loadSpecificTenant,post_my_application,
      load_my_query, load_my_applications,  sendSocketPost,patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct,
       hideLoading, errorLoading,  setCurrentApplicationFunc, breakFormToComponents,  getProfileStruct,
       setCurrentUnitFunc
    } from '../../../state/actions/tenantAction';
import Spin from  'antd/lib/spin';
import Button from'antd/lib/button';
import ProfileContent from '../tenantlayouts/profile_content';
import Modal from 'antd/lib/modal';
import Progress from 'antd/lib/progress';
import Radio from  'antd/lib/radio';
import  Input from 'antd/lib/input';
import moment from 'moment';
import Col from 'antd/lib/col';
import Advert from '../tenantlayouts/advert'
import InputNumber from 'antd/lib/input-number';
import  DatePicker from 'antd/lib/date-picker'; 
import  AutoComplete from 'antd/lib/auto-complete';
import  Cascader from 'antd/lib/cascader';
import Icon from 'antd/lib/icon';
import {Switch as AntSwitch} from 'antd';
import Select from 'antd/lib/select';
import Agreement_modal  from './Agreement_modal.js'
import 'moment/locale/en-gb';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Slider, Row } from 'antd';
import TenantModal from './Tenant_Modal';
import $ from 'jquery';
import { notification } from 'antd';
import ApplicationOverview from './ApplicationsComponents/ApplicationOverview';
var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';

 class TenantApplicationsDetail extends Component{
    constructor(props) {           
    super(props);
    this.state = {}
    this.runLoadQuery = this.runLoadQuery.bind(this);    
    }
 componentWillMount(){  
    let tenant_id = this.props.match.params.id;
    let unit_uuid = this.props.match.params.uuid;
    let address = this.props.match.params.address;
     this.setState({application:null, address:address, id:tenant_id, unit_uuid,  unit:null, error:false, errorMessage: '', notFound404:false , loading:true})
      if(!this.props.auth.user.uuid){
       this.context.router.history.push("/sign-in");    
     }
    if( tenant_id !== this.props.auth.user.uuid){
     this.context.router.history.push("/tenant/applications/"+this.props.auth.user.uuid+"/"+address+"/"+ unit_uuid);  
     } 
    
}
 componentDidMount(){   
      let tenant_id = this.props.match.params.id;
      let address =  this.props.match.params.address;
      let unit_uuid = this.props.match.params.uuid;
      console.log(tenant_id,address,unit_uuid, 'params')
      let checkApp;  
      this.setState({loading:true})
      this.props.loadMyApplications(unit_uuid +'/').then((res)=>{
        if (this.props.myApplications.length !== 0){
             checkApp = this.props.myApplications.findIndex( i => i.units == unit_uuid); 

  }else{  
     checkApp = -1;
    }
    if( checkApp && checkApp !== -1) {
             this.props.setActiveApp(this.props.myApplication[checkApp])
        }else{
            this.props.setActiveApp({none:true, count:0})
            }
    let obj2 = {};
    obj2['application'] = checkApp !== -1 ? res[checkApp] : null;
    this.setState(obj2);
     this.runLoadQuery(unit_uuid);
    

    }).catch ((err) =>{
        this.runLoadQuery(unit_uuid);
    })      
}
runLoadQuery (item){   
    let unit_uuid = item;
     this.props.loadMyQuery('units='+unit_uuid).then(()=>{ 
    console.log(this.props.queryResult.results)
    if ( this.props.queryResult.results) {       
     this.setState ({unit: this.props.queryResult.results.units[0], loading:false }, ()=>{
     if (this.state.unit){
       //this.context.router.history.push("/tenant/applications/"+this.props.auth.user.uuid+'/'+this.state.address+"/"+ this.state.unit_uuid +"/overview" ); 
       //this.props.setActiveUnit(this.state.unit)
      //this.context.router.history.push("overview" ); 
      
      }; 

    })
    }
    else{
           this.setState({loading:false, error:true, errorMessage:"We could not load this particular unit probably you mispelled the url parameters, please go back or query for the unit u desire "})  
    } 
     }).catch((err)=>{
        this.setState({loading:false, error:true, errorMessage:"We could not load this particular unit probably you mispelled the url parameters, please go back or query for the unit u desire "})
    })

}
componentDidUpdate(prevProps, prevState) {

}
   
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
  
 render(){  
{/*if(! this.state.loading){
 if ( !this.state.error){*/}
return (
<div className = "t-fullheight t-md-10">
<Link className = "m-nav-li t-md-10" to = {`/tenant/applications/${this.props.auth.user.uuid}/${this.state.address}/${this.state.unit_uuid}/overview`} activeClassName ="m-active-nav"><i className = "fa fa-user-circle lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Registeration Status</span> <div className = "t-bullet m-activate">{this.props.myProfile ? this.props.myProfile.tenants.completed +' %' : null}</div> </Link>

<div className = "t-fullheight t-md-75" >
{/*<Route strict  exact path={`/tenant/applications/:id/:address/:uuid/overview`}  component={ApplicationOverview}/>*/}
<div className = "t-md-2  t-fullheight">
  <Advert/>
</div>
</div>
</div>
      
   )
{/*} }else{
     return(
         <div className = "t-md-10 t-ful-height t-flex t-flex-column t-justify-center t-align-center t-align-content-center">
             <Icon type = "warning" style = {styles.icon}/>
             <p style = {styles.span}>{this.state.errorMessage}</p>      

           </div>  
     )
 }
}else{
    return (
        <Icon style ={
            { color:'#333', fontSize:'40px', marginTop:'200px', marginLeft:'200px'}
        } 
        
         type = "loading" />
    )
}*/}
   
              
                 
        
     }
 }
const styles = {
     icon:{
        color:'#9999', fontSize:'150', marginBotttom:'20px',        
    },
    span:{
        fontFamily:'Museo', margin:0, padding:0, textAlign:'center', fontSize:'16px', lineHeight:'18px', color:'#222'
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
        activeApplication: state.ApplicationDetails.currentApplication
  
 
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

TenantApplicationsDetail.contextTypes = {
    router: PropTypes.object.isRequired,
    }
export default connect(matchStateToProps, mapDispatchToProps)(TenantApplicationsDetail)
