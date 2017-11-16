import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import FormElements  from '../../tenantlayouts/form_elements';
import { loadAllTenants, loadSpecificTenant, post_my_application,
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
import ApplicationsConfirm from './applicationsConfirmForm';
import InspectionForm from './inspectionForm';
import  PayWithPaystack from '../../tenantlayouts/durables/controllers/Paystack';
import LeaseSigningForm from './leaseSigningForm';
import RightPanel from './rightPanel';
import LeftPanel from './leftPanel';
import $ from 'jquery';

const mode =   ['profile','inspection','lease','pay','beginLease','maintainance'];
 class ProfileConfirm extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, mode:'profile', Lease : null, token:null, update:false, showModal:false, inspectionState:null, promoted:{loading:false, error:false, results:undefined},data:{}};
         this.selectMode = this.selectMode.bind(this)
         this.setInspection = this.setInspection.bind(this);
         this.getInspection = this.getInspection.bind(this);
         this.getLease = this.getLease.bind(this);
         this.postApplications = this.postApplications.bind(this);
         this.signed = this.signed.bind(this);
    
    }
    selectMode=(item)=>{
        this.setState({mode:item});
    }
    componentWillMount(){  
        this.setState({ token:localStorage.getItem("rs_token")}, ()=>{

       
        })

   
       }
    componentDidMount(){ 
       if (this.props.activeUnit){
          this.getInspection();
          this.getLease();
     
        this.setState({
            profilePicture: this.props.myProfile.tenants.tenant_bio.profile_picture ?  this.props.myProfile.tenants.tenant_bio.profile_picture : "",
            displayPicture1: this.props.activeUnit && this.props.activeUnit.unit_images[0]  ?  "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"  + this.props.activeUnit.unit_images[0].id: '',
            displayPicture2: this.props.activeUnit && this.props.activeUnit.unit_images[2]   ?  "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"  + this.props.activeUnit.unit_images[1].id: '',
            displayPicture3: this.props.activeUnit.unit_images[2]  && this.props.activeUnit ?  "url(https://rentright-api-gateway.herokuapp.com/user/units/image/"  + this.props.activeUnit.unit_images[2].id: '',
    
    })
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

   signed(params){
        this.setState({params});
        this.selectMode('pay');

    }
setInspection(obj){
    console.log(obj, 'setInspection');
    let url = "https://rentright.herokuapp.com/api/rentright/inspection/" 
    let api = new apiActions(url);
     this.setState({loading:true});
      this.setState({ inspectionState: { loading : true}});
      api.patchurl (this.props.activeUnit.uuid,
        { inspection_day:obj.date,
          inspection_time:obj.time
        })
        .then((obji)=>{
            console.log(obji,'respose')
    this.setState({ inspectionState: { loading : false}});
      this.setState({loading:false, update:obji});
      }).catch((err)=>{
        console.log(err, "could not complete update")
       this.setState({loading:false, update:false})
       this.setState({ inspectionState: { loading : false}});
      })
}
getInspection(){
    this.setState({inspectionState : {loading:true, inspection_day:null, inspection_time:null} });
    let api = new apiActions("https://rentright.herokuapp.com/api/rentright/inspection/")
    api.geturl(this.props.activeUnit.uuid, false).then((obj)=>{
        this.setState({ inspectionState: {inspect_day : obj.inspection_day , inspection_time: obj.inspection_time, loading : false}});    
         this.setState({loading:false, update:obj});
    }).catch((err)=>{
        console.log(err);
        this.setState({ inspectionState: {loading : false}});  
    })

    

}

getLease(){
    this.setState({Lease : {loading:true} });
    let api = new apiActions("https://rentright-api-gateway.herokuapp.com/")
    api.geturl_with_headers("applications/"+this.props.activeApplication.uuid+"?include=lease" , true, this.state.token).then((obj)=>{
         api.geturl_with_headers("leases/"+obj.data.lease.data.uuid+"?compiled=true", true, this.state.token).then((obj2)=>{         
        console.log('lease object',obj2)
         this.setState({ Lease: {loading : false, lease:obj2.data}});  

        }).catch((err)=>{
        console.log('lease error',err);
     
    });
    }).catch((err)=>{
        console.log('applications error',err);
        this.setState({ Lease: {loading : false}});  
    })
}
  postApplications(obj){
    let th = this;
    console.log(obj);
    th.props.post_my_application(obj).then((it)=>{   
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



  
 render(){  
    if (this.props.activeUnit ){
  return (
    
    <div className = "t-md-10 t-fullheight t-white bord">

        <div className = "sieve">
        <div className = "d-left correct d-fixed">    
           <LeftPanel 
           myProfile = {this.props.myProfile}
             activeUnit = {this.props.activeUnit}
              auth = {this.props.auth}  
              mode = {this.state.mode}
              selectMode = {this.selectMode}
            activeApplication = {this.props.activeApplication}
           />


        </div>

        <div className = "pub-right ">
        {
            this.state.mode == "profile" ?
        <ApplicationsConfirm 
                activeUnit = {this.props.activeUnit}
                structure = {this.props.structure}
                activeApplication = {this.props.activeApplication}
                 auth = {this.props.auth}  
                mode = {this.state.mode}
                />   
                :
            this.state.mode == "inspection" ?
             <InspectionForm 
                inspectionState = {this.state.inspectionState}
                update = {this.state.update}
                loading = {this.state.loading}
                setInspection = {this.setInspection}
                activeUnit = {this.props.activeUnit}
                structure = {this.props.structure}
                activeApplication = {this.props.activeApplication}
                 auth = {this.props.auth}  
                mode = {this.state.mode}
            
                />    
            :
           this.state.mode == "lease" ?
             <LeaseSigningForm
                token = {this.state.token}
                setInspection = {this.setInspection}
                activeUnit = {this.props.activeUnit}
                structure = {this.props.structure}
                activeApplication = {this.props.activeApplication}
                auth = {this.props.auth} 
                activeLease = {this.state.Lease.lease} 
                loading = {this.state.Lease.loading}
                mode = {this.state.mode}
                selectMode = {this.selectMode}
                    signed = {this.signed}
                />  
                :
         this.state.mode == "pay" ?
     <div className = "u-section">
        <div className = "d-h1 u-line-head" >Pay Rent</div>
        <div className = "d-span">Pay a total rent of {this.state.Lease.lease.terms.data.rent_amount}</div>
        <div className = "u-section" style = {{marginTop: '100px'}}>
        <PayWithPaystack  selectMode = {this.selectMode} amount = {this.state.Lease.lease.terms.data.rent_amount}  status = {this.state.status} tenantEmail = {this.state.Lease.lease.lessee.data.email} /> 
        </div>  
        </div>            
            :
            null
        
        }     
        </div>

        <div className = "t-md-2 t-flex-column smp t-flex">
             <RightPanel 
             applicationsPostIndicator ={this.props.applicationsPostIndicator}
             postApplications = {this.postApplications}
            post_my_application = {this.props.post_my_application}
             activeApplication = {this.props.activeApplication}
             applicationsPost = {this.props.applicationsPostIndicator}
             applicationsPostIndicator = {this.props.applicationsPostIndicator}
             myProfile = {this.props.myProfile}
             activeUnit = {this.props.activeUnit}
              mode = {this.state.mode}
             auth = {this.props.auth}   
          
             />
        </div>
       </div>     
      </div>
      )
    }else{
        console.log('nothing was loaded heere')
          this.context.router.history.push("/tenant/profile"); 
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

ProfileConfirm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
ProfileConfirm.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(ProfileConfirm)
