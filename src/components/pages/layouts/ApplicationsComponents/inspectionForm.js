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
import {Modal, Button , Col,AutoComplete,Cascader,TimePicker, notification, Slider,  Calendar ,  Row , LocaleProvider ,InputNumber, Icon, DatePicker ,  Select,Switch, Progress,  Input ,Radio} from 'antd';
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

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

export default class InspectionForm extends Component{
    constructor(props) {  
    super(props) 
         this.state = {loading:false, showModal:false, time:null, date:null, promoted:{loading:false, error:false, results:undefined},data:{}};   
         this.onPanelChange = this.onPanelChange.bind(this); 
         this.onChange = this.onChange.bind(this);
         this.setInspection = this.setInspection.bind(this);
    }
    componentWillMount(){  
   
       }
    componentDidMount(){    
        this.setState({ })
     }
     componentDidUpdate(prevProps, nextState) {
          if(nextState.update){

          }

     }

    runLoadQuery (item){   
   

}
setInspection(){
if (this.state.time && this.state.date){
console.log(this.state, 'currnt state')
this.props.setInspection({time: this.state.time, date: this.state.date})
}
}
componentWillUpdate(prevState, nextState){
 
}
 onPanelChange(value) {
    let val =  moment(value).format("DD/MM/YYYY")
     console.log(val,  'Panel Changed');
     this.setState({date:val});
}
onChange(time,timeString){   
    let tme = time.format('hh:mm a');
     console.log(tme)
     this.setState({time:tme})
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
  return (
            <div className = "t-md-10 t-full-height ">
            <div className = "public-profile-top ">
            <div className = "pub-m-logo"></div>
            <h1 className = "d-h1 t-center-f" style = {{marginBottom:'10px'}}>Schedule Inspection</h1>
            <div className = "p t-center-f dp"> Schedule physical or virtual inspecton of this property to determine if it isthe best fit for you, please fill out the feedback form so we will know what step to take next
            </div>
        </div>
               <div className = "pub-completion">

        <div className = "t-md-10 t-flex t-justify-space-around t-flex-row" >
            <div className = "t-flex t-align-top t-align-content-top  t-flex-column t-md-4" style = {{padding:'20px', boxSizing:'borderBox'}}>
               <h1 className = "d-h1" style = {{fontSize:'16px', fontWeight:'500', marginBottom:'30px'}}>Select your preferred date of Inspection</h1>
                <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar  fullscreen={false} onSelect={this.onPanelChange} /> 
                </div>
                </div>

    <div className = "t-flex t-align-top t-align-content-top t-align-content-center t-align-center t-flex-column t-md-4">
         <h1 className = "d-h1 t-md-10" style = {{fontSize:'16px', marginBottom:'30px', fontWeight:'500', textAlign:'center'}}>Select a convinient time</h1> 
           
            <div className = "t-md-10 t-flex t-flex-row t-justify-space-between"><TimePicker use12Hours = {true} onChange={this.onChange} />
            <div onClick = {this.setInspection} style =  {this.state.time && this.state.date ? {opacity:1} : {opacity:0.5, cursor:'crosshairs'}} className = "d-btn d-a">
               { !this.props.loading  || this.props.inspectionState && this.props.inspectipnState.loading
               ?
               "Set time"
                :
            <Icon type = "loading"/>
               }
                </div></div>
                { !this.props.loading 
                   ?
         <div className = "clock t-flex  t-flex-column t-md-10 t-justify- left t-align t-align-content-center ">
            <div className = "t-md-10 ">
                {
                    this.props.update  || this.props.inspectionState
                    ? 
                 <div className = "t-md-10 t-flex t-flex-column tjsp " style = {{marginTop:'20px'}}>
                       <strong>Your Inspection has being scheduled</strong>
                       <span className = "tjspspan">You can reschedule this appointment just check to see if its an availble time by the landlord</span>
                   </div>
                :
                null
                }
                </div>

             <div className= {!this.props.update && !this.props.inspectionState ? "h1 virgin" : "h1"}>{ !this.props.update && !this.props.inspectionState ?  "00 : 00" 
                 : 
                 moment(this.props.update.inspection_day).format('MM/DD/YYYY')   //(moment(Number(d.match(/\d+/)[0])).format('MM/DD/YYYY'));
                 
                 } </div>
             <div className  = {!this.props.update ? "h2 virgin" : "h2" } > {!this.props.update ? "12 hour clock":  moment(this.props.update.inspection_time).format('hh:mm A')   }</div>            

             </div>
                :
         <div className = "t-md-10 t-flex t-flex-center t-align-center">
             <Icon type = "loading"/>
                 </div>
              }
        </div>

            </div>
                          
        
            </div>
                   { this.props.update ?
                 <div className = "mnapply t-md-2" style = {{marginTop:'auto', marginLeft:'auto'}}><Icon type = "paper-clip"/>Sign Lease agreement </div>
                 :
                 null
                 
                 
                 }

            </div>
      )
    }
   
                   
        
     }
 



InspectionForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
InspectionForm.contextTypes = {
        router: PropTypes.object.isRequired,
    }


