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
import {FlexLayout,List, MainLayout, PictureCards, Profiler, LongCards, GlobalSearch} from '../../tenantlayouts/durables/layout_elements/flex_layout';

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
         this.state = {loading:false, showModal:false, promoted:{loading:false, wishlist: [], applications:[], error:false, results:undefined},data:{}};
         this.setupShop.bind(this);    
    
    }
    setupShop(){
        this.setState({loading:true})
        let api = new apiActions('https://rentright.herokuapp.com/api/rentright/wishlist/detail/');
        let api2 = new apiActions('https://rentright.herokuapp.com/api/rentright/tenants/applications/');
         api2.geturl(this.props.user.uuid, false).then((obj2)=>{
            this.setState({loading:false})
            let app = obj2.results;
            console.log(app, 'app')
              let list = app.results.map((item)=>{
                let j = {}
                j['detail'] = item;
                let api3 = new apiActions('https://rentright.herokuapp.com/api/rentright/units/query?units='  );
                this.setState({loading:true})
                api3.geturl(item.units, false).then((data)=>{
                    console.log('query', data)
                   j['display'] = data.results.units[0];
                       this.setState({loading:false})
                }).catch((err)=>{
                  console.log('err0r unit', err)
                this.setState({loading:false})
                })
                 return j
            })
            console.log(list, 'list')
            this.setState({applications:list})
         
        }).catch((err)=>{
                    console.log('err0r', err)
            this.setState({loading:false})
        })
            this.setState({loading:true})
        api.geturl( this.props.auth.user.uuid, false).then((obj)=>{
               this.setState({loading:false})
            this.setState({wishlist: obj.units})
            this.setState({loading:false})
        }).catch((err)=>{
            console.log(err, 'Error message')
            this.setState({loading:false})
        })
        
    }
    componentWillMount(){  
   
       }
    componentDidMount(){ 
      this.setupShop ();
        
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
             <div className = "app-idea app-bg"
                      style = { this.state.applications  && this.state.applications.length  > 0 &&  this.state.applications[this.state.applications.length - 1] &&  this.state.applications[this.state.applications.length - 1].display ? 
                       {backgroundImage: "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+ this.state.applications[this.state.applications.length - 1].display.unit_images[0].id                 
                        +")" } : 
                      null
                      }

                     
                     > 
                     <div className = {this.state.applications && this.state.applications.length > 0 ? "app-cover app-temp" : "t-md-10 t-fullheight app-temp"} >
                     <Icon type = {this.state.laoding?"loading" :"home"}/><div className = "app-small"><div className = "app-small-h1">{ this.state.applications ? this.state.applications.length : 0} Application</div><div className = "app-small-h2">Manage Applications</div></div></div>
                    </div>                   
                    
                    
                    
                    
                     <div className = "app-idea app-bg"
                      style = { this.state.wishlist  && this.state.wishlist.length > 0 ? 
                       {backgroundImage: "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+ this.state.wishlist[this.state.wishlist.length - 1].unit_images[0].id                 
                        +")" } : 
                      null
                      }

                     
                     > 
                     <div className = {this.state.wishlist  && this.state.wishlist.length > 0 ? "app-cover app-temp" : "t-md-10 t-fullheight app-temp"} >
                     <Icon type = {this.state.laoding?"loading" :"home"}/><div className = "app-small"><div className = "app-small-h1">{ this.state.wishlist ? this.state.wishlist.length : 0} in  Wishlist</div><div className = "app-small-h2">Search for wishes</div></div></div>
                    </div>




                     </div>






            <div className = "events">
             {this.state.loading ? 
               <Icon type = "loading" style = {{fontSize:'60px', color:'#666', marginLeft:'40%', textAlign:'center',
                alignItems:'top',alignContent:'top',
                zIndex:'4000', position:'fixed', marginTop:'20px', texAlign:'center'}}/>
               : null
               }
             { this.state.wishlist && this.state.wishlist.length > 0 
            ?
            <div className = "t-md-10 t-fullheight ">
            <div className  = "t-md-10 t-flex t-space-around  page-padding">
              <span className = "app-header">Wished Lists</span>
              <span className = "bodyTest">SEE ALL <Icon type = "right" /></span>
            </div>
            <div className = "t-md-10 t-flex-wrap t-fullheight t-flex bot page-padding">
              { 
              this.state.wishlist.map((itemm,i)=>{    
                  return(
                    <Profiler  key = {i} notdummy = {true}
                    style = {{marginRight:'10px'}}
                    img = {itemm.unit_images[0] ?"https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id: undefined}
                    paragraph = {itemm.bedrooms+ " bedroom apartment, located in " + itemm.title+ " .Rent goes for " + 
                                  itemm.monthly_rent}
                                  name = "Get this nice" />            

                  )
                })
            
              }           
       
                </div>
                </div>
                :
                null
                }

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
