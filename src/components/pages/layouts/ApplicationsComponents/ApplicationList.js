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

 class ApplicationList extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, promoted:{loading:false, error:false, results:undefined},data:{}};
        
    
    }
    setpShop(){
        //this.apiActions.
        
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
 render(){  
   if (this.props.auth.user.id == this.props.match.params.id){
   
  return (
         <div className = "t-fullheight t-md-10  app-over">
             <div className = "app-first">
                 <div className = "app-header">My Applications </div>
                     <div className = "app-search-bar">
                         <Icon type = "search"/>
                         <input type = "text"/>
                         </div>
                 </div>
                 <div className = "app-second t-flex-wrap">
                     <div className = "app-idea app-create">
                         <Icon type = "appstore-o"/>
                         <span>Create Search pattern</span>
                     </div>
                    <div className = "app-idea"> <Icon type = "home"/> <div className = "app-small"><div className = "app-small-h1">No Application</div><div className = "app-small-h2"> pending applications</div></div></div>
                     <div className = "app-idea"> <Icon type = "home"/><div className = "app-small"><div className = "app-small-h1">No Wishlist</div><div className = "app-small-h2">Search for wishes</div></div></div>

                     </div>
             </div>
         )
    }else{    
          this.context.router.history.push("/tenant/my/Applications/" + this.props.auth.user.id); 
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

ApplicationList.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
ApplicationList.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(ApplicationList)
