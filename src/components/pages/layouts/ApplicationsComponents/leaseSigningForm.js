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
import {getImage} from '../../../../utils/ApiManager';
import ProfileContent from '../../tenantlayouts/profile_content';
import {Modal, Button , Col,AutoComplete,Cascader,TimePicker, notification, Slider,  Calendar ,  Row , LocaleProvider ,InputNumber, Icon, DatePicker ,  Select,Switch, Progress,  Input ,Radio} from 'antd';
import moment from 'moment';
import Agreement_modal  from '../Agreement_modal'
import * as SmoothScroll from 'smooth-scroll';
import  PayWithPaystack from '../../tenantlayouts/durables/controllers/Paystack';
import 'moment/locale/en-gb';
import  apiActions from '../../tenantlayouts/durables/controllers/apiActions';
import ModalForms from '../modal_forms';
import Advert from '../../tenantlayouts/advert'
import enUS from 'antd/lib/locale-provider/en_US';
import TenantModal from '../Tenant_Modal';
import $ from 'jquery';
import  SignPad  from '../../../shared/SignPad';

var _ = require('lodash');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';
const scroll = new SmoothScroll();
const arrayparams = ['terms', 'tenant_covenant', 'landlord_convenant', 'agreements', 'sign', 'pay']
export default class LeaseSigningForm extends Component{
    constructor(props) {  
    super(props) 
        this.state = {loading:false, display:[0,1,2,3,4,5], 
             exitCSS:{}, arrayparams, 
             terms:{complaintsInActive:false},             
        complaints:null , nextable:true, prevable:false, selected:0,  showModal:false, time:null, date:null, promoted:{loading:false, error:false, results:undefined},data:{}};   
        this.swipeSlide = this.swipeSlide.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this.navigateIn = this.navigateIn.bind(this);
        this.fillComplaints = this.fillUpComplaints.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.registerComplaints = this.registerComplaints.bind(this);
        this.signed = this.signed.bind(this);

    }
    registerComplaints(item,complaints){
        let obj = {};
        obj[item] = complaints;
        this.setState({complaints: obj})

    }
    signed(param){
        this.props.signed(param)
    }
    componentWillMount(){ 
             
       }
    onSwitchChange(item, vl){
        let itemindex = arrayparams.indexOf(item)
       let obj = {}   
        obj[arrayparams[itemindex]] = {complaintsInActive:vl}
        console.log(obj , 'obj')
        this.setState(obj)
    }
    swipeSlide(context){
        scroll.animateScroll(0);
         if (context === "next"){
          if (this.state.selected + 1 < this.state.display.length + 2){
              if(this.state.selected + 2  === this.state.display.length + 1){this.setState({nextable:false})};  
              if (arrayparams[this.state.selected] == "pay" ){this.props.selectMode('pay')}    
              let sel = this.state.selected;
              this.navigateOut().then(()=>{
               this.setState({selected: this.state.selected + 1 }, ()=>{
                if(this.state.selected > 0 ){this.setState({prevable:true})};
               this.navigateIn();
               });
              })
 
             }
         }else{
           console.log(this.state.selected - 1 , "Selected state")
          if (!this.state.selected - 1  < 0 ){
              console.log(context);
              if(this.state.selected - 2  < 0){this.setState({prevable:false})}               
              this.navigateOut().then(()=>{
              this.setState({selected: this.state.selected - 1 }, ()=>{
               if(this.state.selected <  this.state.display.length - 1){this.setState({nextable:true})};
               this.navigateIn();   
              });
        });
            }
         }         
    }
fillUpComplaints(context, value = null){
     switch(context){
         case 'reset':
         this.setState({complaints:null})
         break;
         case 'add':
         this.setState({complaints:value})
         break;
        case 'remove': 
        let todelete = this.state.complaints;
        let ks = Object.keys(value);
          ks.map((k)=>{
            delete todelete[k]
        })
        this.setState({complaints:todelete})
         break;
         default :
         this.setState({complaints:null});         
     }
    }
    navigateOut(){
        return new Promise((resolve,reject)=>{
            this.setState({exitCSS:{opacity:0}}, ()=>{              
                this.setState({display:'none'},()=>{
                resolve(true)
                });
            })
        })
    }
    navigateIn(){
            return new Promise((resolve,reject)=>{
            this.setState({exitCSS:{opacity:1}}, ()=>{
                this.setState({display:'flex'},()=>{                
                resolve(true)
                });
            })
        })

    }
    componentDidMount(){    
        this.setState({ })
     }
     componentDidUpdate(prevProps, nextState) {
 
     }

    runLoadQuery (item){   
   

}

  
 render(){  
  return (
            <div className = "t-md-10 t-flex  t-flex-column t-fullheight u-trans bx" style = {{padding:'20px 30px'}}>

              <div className = "t-md-10 t-fullheight  " style = {this.state.exitCSS} >
                <div className = "public-profile-top ">
            <div className = "pub-m-logo"></div>
            <h1 className = "d-h1 t-center-f" style = {{marginBottom:'10px'}}>Lease Agreement</h1>
          </div>

            {
             
             !this.props.loading             
              ?           
              <div className = "t-md-10 t-fullheight t-flex t-flex-column">
            { 
              this.props.activeLease && this.state.selected == 0 ? 
                  <div className = "u-section">
                     <div className = "d-h1 u-line-head" >Terms  Of Agreeement </div>
                     <div className = "t-md-10 t-flex t-flex-column" style  = {{marginBottom:'25px' , marginTop:'15px'}}>
                        <div> <strong className = "strong">Total Rent Payable : </strong><span className = "u-highlight">
                              { this.props.activeLease   ? this.props.activeLease.terms.data.rent_amount : "No terms defined"}
                         </span></div>
                    <div> <strong className = "strong">Rent type : </strong><span className = "u-highlight">
                              { this.props.activeLease   ? this.props.activeLease.terms.data.rent_type : "No terms defined"}
                         </span></div>
                          </div>
                    
                     <div className = "d-span"> { this.props.activeLease   ? this.props.activeLease.terms.data.term_statement : "No terms defined"}</div>   

                     <div className = "t-md-10 t-flex t-flex-row u-up-border " style  = {{marginBottom:'25px' , marginTop:'15px'}}>
                         <div className = "t-flex t-md-4 t-flex-column">
                        <div className =  "u-highlight"><strong className = "strong">Lessee : </strong>{this.props.activeLease.lessee.data.first_name} {this.props.activeLease.lessee.data.last_name}</div>
                        <div className = "provisioned-h2">{this.props.activeLease.lessee.data.email} </div>
                             </div>
                        <div className = "t-flex t-md-4 t-flex-column">
                    <div className =  "u-highlight"><strong className = "strong">Lessor : </strong>{this.props.activeLease.lessor.data.first_name} {this.props.activeLease.lessor.data.last_name}</div>
                    <div className = "provisioned-h2">{this.props.activeLease.lessor.data.email} </div>  

                             </div>
                     </div>
        
                   <div className = "u-section u-up-border t-flex t-flex-column t-md-10 u-bottom-border  u-margin-bottom m-top-large">
                      <div className = "provisioned-h2 t-md-5 t-flex t-justify-space-between"><span className = "agreement">I agree to these terms</span> <Switch defaultChecked={true} onChange={(e)=>this.onSwitchChange('terms', e) } /> </div>
                       <textarea  disabled = {this.state.terms.complaintsInActive} className = "u-textarea"  rows = "5" placeholder = "Provide info if you disagree"></textarea>
                      <div className = "t-md-10  t-justify-right t-flex t-flex-row">
                       <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('add', val)} style = {{marginBottom:'20px', marginLeft:'10px'}}>Submit</div>
                    
                    <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('remove', val)} style = {{marginBotto:'20px', marginLeft:'10px'}}>Clear</div>
                       </div>
                      </div>
                      </div> 
                 
                               
              :
               this.props.activeLease && this.state.selected == 1 ?             
            <div className = "u-section">
                 <div className = "d-h1 u-line-head" >Tenant Convenant</div>
                 <div className = "t-md-10">
                     { this.props.activeLease.tenant_covenants.data.map ((item, index)=>{
                         return(
                    <div className = "t-md-10  u-line-head " key = {index} >
                        <div className = "d-span"> { item.statement }</div>  
                        </div>

                         )
                     })
                     }
           
                </div>
            <div className = "u-section u-up-border t-flex t-flex-column t-md-10 u-bottom-border  u-margin-bottom m-top-large">
                      <div className = "provisioned-h2 t-md-5 t-flex t-justify-space-between"><span className = "agreement">I agree to these terms</span> <Switch defaultChecked={true} onChange={(e)=>this.onSwitchChange('tenant_convenant', e) } /> </div>
                       <textarea  disabled = {this.state.terms.complaintsInActive} className = "u-textarea"  rows = "5" placeholder = "Provide info if you disagree"></textarea>
                      <div className = "t-md-10  t-justify-right t-flex t-flex-row">
                       <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('add', val)} style = {{marginBottom:'20px', marginLeft:'10px'}}>Submit</div>
                    
                    <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('remove', val)} style = {{marginBotto:'20px', marginLeft:'10px'}}>Clear</div>
                       </div>
                      </div>



                </div>
                
               :
                this.props.activeLease && this.state.selected == 2 ?             
            <div className = "u-section">
                 <div className = "d-h1 u-line-head" >Landlord Convenant</div>
                 <div className = "t-md-10">
                     { this.props.activeLease.landlord_covenants.data.map ((item, index)=>{
                         return(
                    <div className = "t-md-10  u-line-head " key = {index} >
                        <div className = "d-span"> { item.statement }</div>  
                        </div>

                         )
                     })
                     }
           
                </div>
            <div className = "u-section u-up-border t-flex t-flex-column t-md-10 u-bottom-border  u-margin-bottom m-top-large">
                      <div className = "provisioned-h2 t-md-5 t-flex t-justify-space-between"><span className = "agreement">I agree to these terms</span> <Switch defaultChecked={true} onChange={(e)=>this.onSwitchChange('landlord_convenant', e) } /> </div>
                       <textarea  disabled = {this.state.terms.complaintsInActive} className = "u-textarea"  rows = "5" placeholder = "Provide info if you disagree"></textarea>
                      <div className = "t-md-10  t-justify-right t-flex t-flex-row">
                       <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('add', val)} style = {{marginBottom:'20px', marginLeft:'10px'}}>Submit</div>
                    
                    <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('remove', val)} style = {{marginBotto:'20px', marginLeft:'10px'}}>Clear</div>
                       </div>
                      </div>



                </div>

              :              

             this.props.activeLease && this.state.selected == 3 ?             
            <div className = "u-section">
                 <div className = "d-h1 u-line-head" >Agreements</div>
                 <div className = "t-md-10">
                     { this.props.activeLease.agreements.data.map ((item, index)=>{
                         return(
                    <div className = "t-md-10  u-line-head " key = {index} >
                        <div className = "d-span"> { item.statement }</div>  
                        </div>

                         )
                     })
                     }
           
                </div>
            <div className = "u-section u-up-border t-flex t-flex-column t-md-10 u-bottom-border  u-margin-bottom m-top-large">
                      <div className = "provisioned-h2 t-md-5 t-flex t-justify-space-between"><span className = "agreement">I agree to these terms</span> <Switch defaultChecked={true} onChange={(e)=>this.onSwitchChange('agreements', e) } /> </div>
                       <textarea  disabled = {this.state.terms.complaintsInActive} className = "u-textarea"  rows = "5" placeholder = "Provide info if you disagree"></textarea>
                      <div className = "t-md-10  t-justify-right t-flex t-flex-row">
                       <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('add', val)} style = {{marginBottom:'20px', marginLeft:'10px'}}>Submit</div>
                    
                    <div className = "ll" defaultValue = {this.state.complaints && this.state.complaints.terms ? this.state.complaints.terms : null} 
                       onClick = { (val)=>this.fillUpComplaints('remove', val)} style = {{marginBotto:'20px', marginLeft:'10px'}}>Clear</div>
                       </div>
                      </div>



                </div>

              :
        this.props.activeLease && this.state.selected == 4 ?             
            <div className = "u-section">
                 <div className = "d-h1 u-line-head" >Sign Lease Agreement</div>
            <div className = "u-section" style = {{}}><SignPad onSignatureReceived= {(param)=>this.signed (param)} loading = {false} /> </div>
                </div>

              :
              this.props.activeLease && this.state.selected == 5 ?             
            <div className = "u-section">
                 <div className = "d-h1 u-line-head" >Pay Rent</div>
                 <div className = "d-span">Pay a total rent of {this.props.activeLease.terms.data.rent_amount}</div>

            <div className = "u-section" style = {{marginTop: '100px'}}>
                <PayWithPaystack  selectMode = {this.props.selectMode} amount = {this.props.activeLease.terms.data.rent_amount}  tenantEmail = {this.props.activeLease.lessee.data.email} /> </div>
                </div>
                :
                null







                }  
            <div className = "d-footer" style  = {{marginBottom:'25px' , marginTop:'auto'}} >                   
           {this.state.prevable ? <div className = "d-btn d-a d-submit transp"  style = {{marginTop:'auto'}} onClick = {()=>this.swipeSlide("previous")}>Previous</div>: null}
            {this.state.nextable ?  <div className = "d-btn d-a dd-sub "  style = {{marginTop:'auto'}} onClick = {()=>this.swipeSlide("next")} >Next</div>: null}   



               </div>
              </div>   
              :
              <div className = "t-md-10 t-justify-center t-flex">
              <Icon style = {{fontSize:'80px', color:'#222'}}  type = "loading"/>
              </div>
                
                 }


                  </div>


       

           {/* <div className = "mnapply t-md-2" style = {{marginTop:'auto', marginLeft:'auto'}}><Icon type = "paper-clip"/>Sign Lease agreement </div>*/}
               
            </div>
      )
    }
   
                   
        
     }
 



LeaseSigningForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
LeaseSigningForm.contextTypes = {
        router: PropTypes.object.isRequired,
    }


