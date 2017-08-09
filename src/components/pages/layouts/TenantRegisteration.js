import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import TenantCard from '../tenantCard';
import CircleLinks from '../tenantlayouts/circle_links';
import {bindActionCreators} from 'redux';  
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import FormElements  from '../tenantlayouts/form_elements';
import NewForm  from '../tenantlayouts/new_form';
import Spin from  'antd/lib/spin';
import Icon from 'antd/lib/icon';
import Button from'antd/lib/button';
import ProfileContent from '../tenantlayouts/profile_content';
import Modal from 'antd/lib/modal';
import Progress from 'antd/lib/progress';
var _ = require('lodash');


class TenantRegisteration extends Component{
    constructor(props){
        super(props)
   this.state = Object.assign({},this.parent_state);     
 }
onUpdate  = (obj) => { 
 this.props.onUpdate(obj)
  
} 

        render (){
        
        return (

             <div className = "t-md-10">
                {  
                 this.props.formBreakDownData  && this.props.formBreakDownData.radiogroup && this.props.formBreakDownData.radiogroup.length > 0 ?
               <NewForm  onUpdate = {this.onUpdate.bind(this)} datatype = {"formgroup"} label = {this.props.form.form_part} ownstate = {this.state} keyname = "What is your Income source" data = {this.props.formBreakDownData.radiogroup}/>  
                  : <div></div>
              }
                {  this.props.formBreakDownData.text.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.text.map((item,index) =>{
                        
                  return(  
                   this.props.form.form_part[item].dependent_stat && ! this.props.form.form_part[item].dependent_stat.is_dependent  ?      
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"text"}  label =  {this.props.form.form_part} ownstate = {this.state} name = {this.props.form.form_part[item].key}  keyname = {this.props.form.form_part[item].keyname}  data = {this.props.formBreakDownData.text}    />
                     : 
                    this.state.obj2 && this.state.obj2[item] ? 
                  <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"text"}  label =  {this.props.form.form_part} ownstate = {this.state}  name = {this.props.form.form_part[item].key}   keyname = {this.props.form.form_part[item].keyname}  data = {this.props.formBreakDownData.text}    />
                      :
                      null
           
                         )

                   
                  }) 
                  }
    
                </div>
                
                 :<div></div>
                } 
              {
              this.props.formBreakDownData.select.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.sselect.map((item,index) =>{
                  return(  
                   this.props.form.form_part[item].dependent_stat &&  ! this.props.form.form_part[item].dependent_stat.is_dependent  ?   
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"select"}  label =  {this.props.form.form_part} ownstate = {this.state} options = {this.props.form.form_part[item].options}  keyname = {this.props.form.form_part[item].keyname}  data = {this.props.formBreakDownData.text}    />
               :
                 this.state.obj2 && this.state.obj2[item] ? 
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"select"}  label =  {this.props.form.form_part} ownstate = {this.state} options = {this.props.form.form_part[item].options}  keyname = {this.props.form.form_part[item].keyname}  data = {this.props.formBreakDownData.text}    />
                   :
                   null
                  )
                 
                  }) 
                  }
    
                </div>
                
                 :<div></div>

                  }
                 
               {
                 this.props.formBreakDownData.textarea && this.props.formBreakDownData.textarea.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.textarea.map((item,index) =>{
                  return(  
                  this.props.form.form_part[item].dependent_stat && this.props.form.form_part[item].dependent_stat.is_dependent  ?   
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"textarea"}  label =  {this.props.form.form_part} ownstate = {this.state} options = {this.props.form.form_part[item].options}  keyname = {this.props.form.form_part[item].keyname}  data = {this.props.formBreakDownData.textarea}    />
                 :
                  this.state.obj2 && this.state.obj2[item] ? 
                  <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"textarea"}  label =  {this.props.form.form_part} ownstate = {this.state} options = {this.props.form.form_part[item].options}  keyname = {this.props.form.form_part[item].keyname}  data = {this.props.formBreakDownData.textarea}    />
                 :
                   null
                  )
                 
                  }) 
                  }
    
                </div>
                
                 :<div></div>

                  }                
 


              
               </div>
               
        )

      }
      
      //render
        
    
 }
    TenantRegisteration.PropTypes = {
    context: PropTypes.object.isRequired


}
export default TenantRegisteration;

