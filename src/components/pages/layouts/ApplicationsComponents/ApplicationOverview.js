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
import 'moment';
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

 class ApplicationOverview extends Component{
    constructor(props) {  
    super(props) 
    let tenant_id = this.props.match.params.id;
    let unit_uuid = this.props.match.params.uuid;
    let address = this.props.match.params.address;
    this.state = {application:null, address:address, id:tenant_id, unit_uuid,  unit:null, error:false, errorMessage: '', notFound404:false , loading:true}  
    this.k;
    this.runLoadQuery = this.runLoadQuery.bind(this);
      this.frontimage = null;
      this.listimage = [];
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.postApplications = this.postApplications.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this); 
       this.showModal = this.showModal.bind(this);
       this.hideModal = this.hideModal.bind(this);
         this.hideModal = this.hideModal.bind(this);   
        this.css = {'transform': 'scale(0.2, 0.2)' }
       this.sendobj = {};

    }
    componentWillMount(){  
      //this.runLoadQuery = this.runLoadQuery.bind(this);     
     let tenant_id = this.props.match.params.id;
    let unit_uuid = this.props.match.params.uuid;
    let address = this.props.match.params.address;
     if(! this.props.auth.user.uuid){
       this.context.router.history.push("/sign-in");    
     }
      if( tenant_id !== this.props.auth.user.uuid){
     this.context.router.history.push("/tenant/applications/"+this.props.auth.user.uuid+"/"+address+"/"+ unit_uuid);  
     }  
       }
    componentDidMount(){ 
        //alert('in overview');
        console.log(this.props.activeUnit, 'in overview')
      let tenant_id = this.props.match.params.id;
      let address =  this.props.match.params.address;
      let unit_uuid = this.props.match.params.uuid;
      console.log(tenant_id,address,unit_uuid, 'params')
      let checkApp;  
      this.setState({loading:true})
      this.props.loadMyApplications(tenant_id +'/').then((res)=>{
        console.log(this.props.myApplications.length, 'load my applications resoult is shown here')
        if (this.props.myApplications.length !== 0){
             checkApp = parseInt(this.props.myApplications.findIndex( i => parseInt(i.units) == parseInt(unit_uuid))); 
             console.log(checkApp, 'check app')
       }else{  
     checkApp = -1;
    }
    if( checkApp >= 0) {
      console.log( this.props.myApplications[checkApp], 'running this now')
      this.props.setActiveApp(this.props.myApplications[checkApp])
     }else{
      this.props.setActiveApp({none:true, count:0})
     }
    let obj2 = {};
    obj2['application'] = checkApp >= 0 ? this.props.myApplications[checkApp] : null;
    console.log(obj2['application'] , 'suspect');
    this.setState(obj2);
    this.runLoadQuery(unit_uuid);
    }).catch ((err) =>{
        this.runLoadQuery(unit_uuid);
        this.props.setActiveApp({none:true, count:0})
    })   
        
     }
     componentDidUpdate(prevProps, prevState) {


     }

    runLoadQuery (item){   
    let unit_uuid = item;
     this.props.loadMyQuery('units='+unit_uuid).then(()=>{ 
    console.log(this.props.queryResult.results)
    if ( this.props.queryResult.results) {       
     this.setState ({unit: this.props.queryResult.results.units[0], loading:false }, ()=>{
     if (this.state.unit){
       this.props.setActiveUnit(this.state.unit);     
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
 this.state.unit  ? 
<div className = "t-fullheight t-md-10" style = {{marginTop:'-2%'}}>
<div className= "t-full-height t-md-10">
<div className = "cwall under">
<div className = "t-flex zoomeffect wallpaper"   style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+this.state.unit.unit_images[1].id+ ")"}}>
<div className = "wallpapercover opacityeffect">
  <div className = "kings">
  <div className = "westeros"><span>{this.state.unit.unit_type.replace('_', ' ' )}</span><span>{ this.state.unit.bedrooms + " bedrooms"}</span></div>
  <div className = "knight">
  <div className = "wallh1 line-clamp2">{this.state.unit.title}</div>
  </div>
  </div>
<div className = "watch t-flex t-align-top">
  {
    this.props.activeApplication  && ! this.props.activeApplication.none
    ?
  <div className = "whitewalkers">
    <div className = "kingslanding-top t-flex t-flex-column t-justify-center">
      <span className = "thinlanisters">Applied </span>
      <span className = "deeplanisters">Status : {this.props.activeApplication.status}</span>
      </div>
     <div className = "kingslanding-mid t-flex t-justify-center"><span className = "deeplanisters smx">Applied on<span className = "thinlanisters smx">&nbsp;&nbsp;
        { moment(new Date(this.props.activeApplication.created_at)).format("MMM Do YY")}</span></span> </div>
      <NavLink 
       to = {  "/tenant/confirmprofile/"+this.props.auth.user.uuid+"/"+this.state.unit.address.address.address}
       className = "kingslanding-bottom t-flex t-align-center t-justify-center">
        <span className = "lanisters lgx">Manage Application</span>
      </NavLink>
  </div>
  :
  <div className = "whitewalkers">
    <div className = "kingslanding-top t-flex t-flex-column t-justify-center">
      <span className = "thinlanisters">Monthly Price</span>
      <span className = "deeplanisters">  &#8358; {this.state.unit.monthly_rent.toLocaleString('en') }</span>
      </div>
     <div className = "kingslanding-mid t-flex t-justify-center"><span className = "deeplanisters smx">Status <span className = "thinlanisters smx">{!this.state.unit.status ? "  Available": "Occupied"}</span></span> </div>
      <NavLink className = "kingslanding-bottom t-flex t-align-center t-justify-center"
       to = {  "/tenant/confirmprofile/"+this.props.auth.user.uuid+"/"+this.state.unit.address.address.address}
      ><span className = "lanisters lgx">Apply</span></NavLink>
  </div>

  }
</div>
</div>
</div>
</div>
<div className = "t-flex t-flex-row t-md-10">
<div className = "midpictures upeffect t-flex-column ">
  <div className = "t-md-10 t-flex t-flex-row">
  { this.state.unit.unit_images.slice(0,4).map((obj, ind)=>{
    return(
    <div className = "pictures-got" key = {ind} style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+ obj.id}}>
    <div className = "wallpapercover"></div>
    </div>
    )
  })

  } 
  </div>
  <div className = "k-text-box">
    <div className = "k-t-h1">{this.state.unit.address.address.address}</div>
    <div className = "k-t-pre">{this.state.unit.unit_type.replace('_', " ")}</div>
    <div className = "k-t-p">{this.state.unit.title} {this.state.unit.description}</div>
    </div> 
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
  <div className = "t-flex-row t-flex t-md-10">
    <div className = "kings-left amen">
      <div className = "amenity t-flex-wrap">
        <div className = "t-md-10 ktk"> Amenities</div>
        { 
          this.state.unit.unit_facilities ?
         this.state.unit.unit_facilities.map ((item, index)=>{
         return(      
          <div key = {index} className = "amenrow"><Icon type = "gift"/><span>{item.name.replace('_', " ")}</span></div>
         )
        })
        :
        null
        }
       </div>
       </div>
    </div>

     {this.state.showModal ? <Agreement_modal hideModal = {this.hideModal}/> :null}
</div>

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
        myApplications: state.applications_result.applications,
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

ApplicationOverview.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
ApplicationOverview.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(ApplicationOverview)
