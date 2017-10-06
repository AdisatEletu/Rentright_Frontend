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
import Advert from '../tenantlayouts/advert'
import InputNumber from 'antd/lib/input-number';
import  DatePicker from 'antd/lib/date-picker'; 
import  AutoComplete from 'antd/lib/auto-complete';
import  Cascader from 'antd/lib/cascader';
import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
import Select from 'antd/lib/select';
import  apiActions from '../tenantlayouts/durables/controllers/apiActions';
import {Profiler} from '../tenantlayouts/durables/layout_elements/flex_layout';
import 'moment/locale/en-gb';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Slider, Row } from 'antd';
import TenantModal from './Tenant_Modal';
import ContModal from './ContModal';
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
const pageurl =  "https://rentright.herokuapp.com/api/rentright/units/query/?";
 class TenantSearch extends Component{
    constructor(props) {           
      super(props) 
      this.k;
      this.state ={ showCont:false, showModal:false, states :{}, promoted:{loading:false, error:false, results:undefined} ,query:{loading:false, error:false, results:undefined}}
      this.frontimage = undefined;
      this.listimage = [];
      this.item;
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.postApplications = this.postApplications.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this); 
       this.showModal = this.showModal.bind(this);
       this.showContModal = this.showContModal.bind(this);
       this.queryForApplications = this.queryForApplications.bind(this);
       this. queryForPromotions = this. queryForPromotions.bind(this);
       this.hideModal = this.hideModal.bind(this);
       this.hideContModal = this.hideContModal.bind(this);
        this.uuid = this.props.auth.user.uuid;   
        console.log(this.uuid);
        this.hideModal = this.hideModal.bind(this);   
        this.css =  {'transform': 'scale(0.2, 0.2)' }
       this.sendobj = {};
    }
       componentWillMount(){        
      
     }
    componentDidMount(){ 
      this.queryForPromotions();

     }
     componentDidUpdate(prevProps, prevState) {

     }
  queryForPromotions(){
    this.setState({promoted:{loading:true, error:false, results:undefined}})
    let api_path = "all=true";
    let api = new apiActions(pageurl);
    api.geturl(api_path, false).then((data)=>{
      this.setState({promoted:{loading:false, error:false,results:data}})

    }).catch((err)=>{
      console.log(err)
      this.setState({promoted:{loading:false, error:true, results:undefined}});
    })
    
    

  }
  queryForApplications(api_path){
      this.setState({query:{loading:true, error:false,results:undefined}});
      let url = "https://rentright.herokuapp.com/api/rentright/units/query/?"
      let api = new apiActions(url);
      api.geturl(api_path, false).then((data)=>{     
         this.setState({query:{loading:false, error:false,results:data}});
      }).catch((err)=>{
        console.log(err)
          this.setState({query:{loading:false, error:true, results:undefined}});

      })
    
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
         description: 'Your appliction for  apartment '+obj.property+  ' on rentright was successful we will alert you once iportant events occour we will notify you.',
  });
    }).catch((err)=>{
       console.log(err)
          notification["error"]({
          message: 'Failed to apply',
         description: 'Your appliction was not successful please try again later or check your internet settings.',
  });
    });
  }
    hideContModal(){
     $('.t-midmain').css('z-index', '10');
     this.setState({showCont:false});
     this.setState({'css': undefined});
     if (this.state.ishighlighting != 'time-highlight'){
     this.setState({ishighlighting:'time-highlight'})
     setTimeout(()=>{
       this.setState({ishighlighting:''})
      },
      5000);
     }
   }
    showContModal= (frontimage, listimage, item)=> {
     $('.t-midmain').css('z-index', '30');
     this.frontimage = frontimage;
     this.listimage = listimage;
     this.item = item;
      var th = this;
      console.log(th)
      console.log(th.state)
      this.setState(this.css);
      th.setState({showCont :true, item});
      setTimeout(()=>{
        this.css = {'transform':'scale(1,1)' };
        this.setState(this.css);
        console.log(this.css);
      }, 100);

    }
  
   hideModal(){
     $('.t-midmain').css('z-index', '10');
     this.setState({showModal:false});
     this.setState({'css': undefined});
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
   handleInputChange(event, name = undefined) {
  
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
    th.sendobj[name]  = value ;
    this.setState({states:{
      [name]: value
    }});
  
    console.log(this.state);
 
  } 



  handleSubmit = ()=>{
    var th = this;     
    if (this.state.states !== {}) {
      let path = ""
      let keys = Object.keys(this.state.states)
      let lis = keys.map((item)=>{
        console.log(item)
        if (path == ""){
          path = item + "="+this.state.states[item];
        }else{
          path  += "&" +item + "="  + this.state.states[item] 
        }   
      this.setState({showModal:false, states:{}});       
      })
       path += "&" +"uuid="+this.props.auth.user.uuid;
      console.log(path);
      /*this.props.loadMyQuery(path).then((res)=>{
        console.log(res);
      })*/
      this.queryForApplications(path);

    }

  }
 render(){  


   return (
  

  <div className = "t-flex t-md-10 t-fullheight t-justify-left psmall-pad ">
              {this.state.showCont ?
                 <ContModal  css = {this.state.css} hideContModal = {this.hideContModal} unit = {this.state.item}  frontimage = {this.frontimage}  listimage = {this.listimage}  />
                 :
                 null


          }
        <div className = "t-flex t-md-75 t-flex-column t-fullheight please-dont-shrink" style = {! this.state.query.results? {backgroundColor:'rgba(0,0,0,0)'} : {backgroundColor:'rgba(0,0,0,0)'}}>
          { this.state.showModal ?

                <TenantModal  css = {this.state.css} hideModal = {this.hideModal.bind(this)} unit = {this.state.item}  frontimage = {this.frontimage} listimage = {this.listimage}  />
             :
             undefined
          }
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
          <Slider min={10000} max={2000000000000} step={10000}  value = {this.state.states.rent ? this.state.states.rent : 0} onChange = {(e)=> this.handleInputChange(e,'rent')}  />
        </Col>
        <Col span={3}>
          <InputNumber
            min={1}
            max={2000000000000}
            style={{ marginLeft: 5 }}
             name = "rent" value = {this.state.states.rent ? this.state.states.rent : 0}  onChange = {(e)=> this.handleInputChange(e,'rent')}  step={1000}
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
   { this.state.query? this.props.queryIndicator.Loading ?
       <Button type="primary" loading= {true}>Loading ...</Button>
           :
        <Button type="default" icon="download"  onClick={this.handleSubmit} size="default">Find</Button>
        :
        undefined
   }

   </div>
</div>
</div>

</div>

</div>

<div className = "q-body p-widget"  style = {! this.state.query.results? {backgroundColor:'rgba(0,0,0,0)'} : {backgroundColor:'rgba(0,0,0,0)'}}>
{
  this.state.query ? this.state.query.loading || this.state.promoted.loading?
<div className = "t-md-10 t-justify-center t-align-center t-full-height t-sup-h1">
 <span className = "t-center-f t-md-10"><Icon  type = "loading" /></span>
</div>
:
this.state.query.error  ?
<div className = "toppadsm t-md-10">
<div className = "q-h1sm t-md-10 t-center-f"><Icon type = "bell"/>&nbsp;Could not find any property </div>
<div className  = "t-md-10 t-fullheight q-h11sm t-center-f">Sorry your search parameter returned no result, endeavour to moderate your parameters and search again, should you not find what your are looking for, we will alert you when a property turns up matching your criteria </div>

</div>
 :
this.state.query.results ?
<div className = "q-results-pane">
  <div className = "q-breadcrumbs">
    <div className = "q-b t-fullheight">
     <div className = "q-border-right q-act">{this.state.query.results.results.units.length} Results Returned &nbsp;<Icon type = "down"/></div>
    <div className = "q-border-right q t-flex t-align-center t-justify-space-around">
      <span className = "t-h3">Results&nbsp;&nbsp;&nbsp;&nbsp;</span>
    {
         Object.keys(this.state.states).map((item, k)=>{
          if(typeof(this.state.states[item]) !== 'object'){
          return(
           <span key = {item}>&nbsp;&nbsp;<strong className = "open-sans">{item}</strong> : {this.state.states[item]}</span>
          )
          }
            })


    }
    </div>
    </div>

  </div>
  {this.state.query.results.results.units.map((itemm,i)=>{

     return(
      <div key= {i}className = "q-results" > 
       <div className = "q-image"   style = {itemm.unit_images[0] ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id+ ")"}:undefined}>
       {/* <div className = "q-image" style = {{backgroundImage:"url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"}}>*/}

      <div className= "q-image-cover t-md-10 t-fullheight"><div className = "btn" onClick = { ()=> this.showModal(itemm.unit_images[0].id , itemm.unit_images, itemm) }>
        

         <Icon type = "export"/>&nbsp;Explore Property</div></div>
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
            <div onClick = { ()=> this.showContModal(itemm.unit_images[0].id , itemm.unit_images, itemm) } className = "q-border-right  t-flex t-align-center t-justify-space-around f-q ">
                     Explore&nbsp; <Icon type = "switcher"/>
                     </div>
       {  

        itemm  ?   
         !this.props.applicationsPostIndicator.Loading &&  !this.props.applicationsPostIndicator.Error && !itemm.applied &&  this.props.applicationsPost &&  !this.props.applicationsPost.success 
        ? 
        <div  className = "q-border-right q-act t-flex t-align-center t-justify-space-around f-q fr .m-ellipses"
          onClick = {(e)=>{this.postApplications({units:itemm.id, unit_tenant:this.props.auth.user.id, unit_manager:itemm.unit_manager ,
           leasee_first_name:this.props.auth.user.first_name,
          leasee_last_name:this.props.auth.user.last_name,
          property:itemm.title
              })}}>
           Apply&nbsp; <Icon type = "export"/>
            </div>
         :        
         itemm.applied  ||  this.props.applicationsPost && this.props.applicationsPost.success
        ? 
          <div  className = "q-border-right q-act t-flex t-align-center t-justify-space-around f-q fr q-success .m-ellipses" >
            Application Sent <Icon type = "export"/>
            </div>
          :      
         this.props.applicationsPostIndicator && this.props.applicationsPostIndicator.Loading 
         ?         
           <div  className = "q-border-right q-act t-flex t-align-center t-justify-space-around f-q fr q-working .m-ellipses" >
            Applying ... <Icon type = "loading"/>
            </div>         
          : 
         this.props.applicationsPostIndicator && !this.props.applicationsPostIndicator.Loading && this.props.applicationsPost.Error
         ?
              <div  className = "q-border-right q-act t-flex t-align-center t-justify-space-around f-q fr q-danger .m-ellipses"
              onClick = {(e)=>{this.postApplications({units:itemm.id, unit_tenant:this.props.auth.user.id, unit_manager:itemm.unit_manager,
          leasee_first_name:this.props.auth.user.first_name ,
          leasee_last_name:this.props.auth.user.last_name,
          property:itemm.title
              
              })}}>
                Not Complete Try Again &nbsp; 
                <Icon type = "export"/>
                </div>
            :
            undefined
            :
        <NavLink to = {'/sign-in'}   className = "q-border-right  q-act t-flex t-align-center t-justify-space-around f-q fr qbdiv q-danger .m-ellipses">
                   Sign in&nbsp; <Icon type = "export"/>              
               </NavLink>      
          
       
       }


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
 undefined
 :
 undefined
 


}
{this.state.promoted.error?

<div className  = "t-md-10 t-fullheight q-h11sm t-center-f">Check your connection settings, so ou can have the best experience on the platform </div>
:
null
} 
 {

<div className = "t-md-10 p-hold t-flex-row t-flex-space-between t-flex-wrap">
<div className = "events" style = {{height:'auto', overflow:'visible', height:'400px'}}>
   <div className  = "t-md-10 t-flex t-space-between events-padding">
  <span className = "header-test"  style = {{marginTop:'10px'}}>Promoted Content</span>
  <span className = "bodyTest">SEE ALL <Icon type = "right" /></span>
   </div>
  <div className = "t-md-10 t-flex-wrap t-fullheight t-flex t-justify-space-around bot ">    
{
 this.state.promoted.results ? this.state.promoted.results.results.units.map((itemm,i)=>{    
     return(
       <Profiler  key = {i} notdummy = {true}  style = {{width:'24%', marginTop:'30px'}} height = {true}
       img = {itemm.unit_images[0] ?"https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id: undefined}
       paragraph = {itemm.bedrooms+ " bedroom apartment, located in " + itemm.title+ " .Rent goes for " + 
                    itemm.monthly_rent}
                    name = "Get this nice apartment" />            

     )
  })
  :
  null
}
</div>
 </div>
 </div>
  }



</div>

 </div> 
<div className = "t-md-2  t-fullheight">
  <Advert/>
</div>
 </div>
   
      
      
      
         )
  /*}else{
    return(
   
    );
  }*/
              
                 
        
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
        applicationsResult: state.applications_result,
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
