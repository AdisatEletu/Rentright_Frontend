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
import {FlexLayout,List, MainLayout, PictureCards, Profiler, LongCards, GlobalSearch, AppWidget, AppDetail} from '../../tenantlayouts/durables/layout_elements/flex_layout';
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
let done = null; let status =""; let position=  0; let read =null; let header = ""; let date = ""; 
let detail =null; let display = null; 
 class ApplicationList extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, applications:[], events:null, promoted:{loading:false, wishlist: [], counter:0, applications:[], error:false, results:undefined},data:{}};
         this.setupShop = this.setupShop.bind(this);   
         this.runit = this.runit.bind(this); 
    
    }
    runit(itt, item){ 
        detail = item.detail; 
        display = item.display;  
        let newobj = {done:null, status:"", position:0,read :null, header: "", date :"" };
        console.log(itt, detail[itt], 'runnning')    
        switch(itt){
        case  "created_at":
                newobj.read = true;
                newobj.position = 1;
                newobj.done = detail.created_at ? true : false;
                newobj.date = detail.created_at;
                newobj.header = "Application Successfully Sent";
                newobj.status = "Success";
                 break; 
            case  "status":
                newobj.read = true;
                newobj.position = 2;
                newobj.done = detail.status == "Not Viewed" ? false : true;
                newobj.date = detail.rejected_at ? detail.rejected_at :  detail.terminated_at ? display.updated_at : null;
                newobj.header = "Status of Application";
                newobj.status = detail.status;
                 break;
           case "review_date":
                newobj.position = 3;
                newobj.read = true;
                newobj.done = detail.review_date? true: false;
                newobj.date = detail.review_date;
                newobj.header = detail.review_date ? "Your Application has being reviewed" : "No reviews yet";
                newobj.status = detail.review_date ? "Your application has being accepted" :"Hold tight";
                 break;
            case "accepted_on":
                newobj.position = 4;
                newobj.read =  detail.rejected_at || detail.terminated_at  ? false : true;
                newobj.done = detail.accepted_on ? true: false;
                newobj.date = detail.accepted_on;
                newobj.header = detail.accepted_on ? "Your Application was accepted"  : "Application is on its way";
                newobj.status = detail.accepted_on ? "Your application has being accepted" :detail.rejected_at || detail.terminated_at ? "Your Application was rejected" : "Not yet viewed"
                 break;
           

         case "rejected_on" || "terminated_at":
                newobj.position = 4;
                newobj.read =  detail.rejected_at || detail.terminated_at  ? true : false;
                newobj.done = detail.rejected_at || detail.terminated_at ? true: false;
                newobj.date = detail.rejected_at ? detail.rejected_at :  detail.terminated_at ?  detail.terminated_at : null;
                newobj.header = "Your Application was rejected";
                newobj.status = detail.rejected_at || detail.terminated_at ? "Your Application was rejected" : "Not yet viewed";
                 break;
        default:
         null                                            

        }
        let sortobj = [newobj].sort(function (a, b) {
              return a.position - b.position;
          });
       return sortobj[0]
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
         
            this.setState({applications:list});
                if( list[0]  ){
                let obj = Object.keys(list[0].detail);
                this.setState({events:["created_at","status","review_date","accepted_on","rejected_on", "terminated_at" ]})   
    }
           


         
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
            this.setState({loading:false})
        })
        
    }
    componentWillMount(){  
       this.setupShop ();
       }
    componentDidMount(){ 
    if( this.state.applications[0]  ){
    let obj = Object.keys(this.state.applications[0].detail);
     console.log(this.state.obj,'objevents')
     this.setState({events:obj})
    }
        
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
            <div className  = "t-md-10 t-flex t-space-around  page-padding">
              <span className = "app-header">Manage Applications</span>
              <span className = "bodyTest">SEE ALL <Icon type = "right" /></span>
            </div>
            <div className = "t-md-10 t-flex-start app-pad t-flex  t-flex-wrap t-flex-row t-whiteb" >
             {
                 this.state.applications && this.state.applications.length > 0 ?
                 
                     this.state.applications.map((item,index)=>{
                         console.log(item, 'it')
                       return(
                           <AppWidget key = {index} 
                                applicants = {item.display ? item.display.applications.length : null}
                                landlordName = { item.detail.unit_manager.first_name + " " + item.detail.unit_manager.last_name}
                                landlordImage = {  item.display  && item.display.unit_images ?  "https://rentright-api-gateway.herokuapp.com/user/units/image/"+ item.display.unit_images[0].id 
                                :
                                ''
                                }
                                type =  { item.display ? item.display.title: null}
                                rent = { item.display ? item.display.minimum_lease_term * item.display.monthly_rent : null}
                                applicationDate = {item.detail.created_at}
                                linkTo =  { item && item.display && item.display.address?'/tenant/applications/'+this.props.auth.user.uuid+'/'+item.display.address.address.address+'/'+item.display.id+'/overview' : ""}
                                >

                               {
                                   this.state.events && this.state.events.length > 0
                                   ?
                                   
                                   this.state.events.map((itt, ind)=>{
                                    let newobj = this.runit(itt,item)                               
                                    if (newobj.read){
                                       return (                                   
                                           <AppDetail
                                            position = {newobj.position}   done = {newobj.done}    header = {newobj.header}
                                             status = {newobj.status}      date = {newobj.date}    key = {newobj.ind}                             

                                           />
                                       )
                                    }
                                   })
                                   :
                                   null
                               }

                                </AppWidget>

                       )

                     })                
                 
                 
                 
                 :
                 <div className = "app-none">
                     <Icon type = "customer-service"/>
                     <h1>Hi {this.props.auth.user.firstname} You havent applied for any property yet, would you like to apply for one you can click this button below </h1>
                     </div>
             }
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
