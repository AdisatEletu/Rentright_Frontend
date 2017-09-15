import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup, Switch} from '../basic/flex_form';
import { Progress, Icon} from 'antd';
import $ from 'jquery';
import _scratch from './_scratch'
export default class Middle extends Component{
    constructor(props) {
    super(props)  
    this.state = Object.assign(this.props.ownstate);
    this.buttongroup = false;this.text = false; this.switch = false; 
    this.select = false; this.textarea; this.phone = false; this.date = false;
    this.handleChange = this.handleChange.bind(this);   
    if (this.props.datatype == "formgroup"){
         this.buttongroup = true;
    }
    else if(this.props.datatype == "text") {
        this.text = true;
     }
    else if(this.props.datatype == "switch") {
        this.switch = true;
    }
    else if (this.props.datatype == "select"){ 
        this.select = true; 
    }
    else if (this.props.datatype == "textarea"){ 
        this.textarea = true; 
    }
     else if (this.props.datatype == "phone"){ 
        this.phone = true; 
    }
    else { 
        this.date = true; 
    }

     }


 handleChange = (event)=> {    
    this.setState(event, ()=>{
    this.props.onUpdate(this.state)
    });
  } 


        render (){ 
        if (this.radiogroup) {
            return(
            <ButtonGroup fullwidth ={true} label ="Select source of income"  onUpdate = {(e)=>this.handleChange(e)}   children = {this.props.keyname}  /> 
            )
        } else if (this.textarea) {
            return(
              <Textarea fullwidth ={true}  label ={this.props.keyname} onUpdate = {(e)=>this.handleChange(e)} name = {this.props.name}  />    
            )
        }  else if (this.text) {
            return(
              <Input fullwidth ={true} label ={this.props.keyname} onUpdate = {(e)=>this.handleChange(e)} name = {this.props.name}  />    
            )
        } else if (this.date) {
            return(
            <Date label = {this.props.keyname}  onUpdate = {(e)=>this.handleChange(e)} name  = {this.props.name}/>
            )
        }  
         else if (this.phone) {
            return(
             <Phone fullwidth ={true} label ={this.props.keyname} onUpdate = {(e)=>this.handleChange(e)} name = {this.props.name}  /> 
            )        
        }  else if (this.select) {
            return(
                 <Select fullwidth ={true}  options = {this.props.variable.options} label ={this.props.keyname} onUpdate = {(e)=>this.handleChange(e)} name = {this.props.name}  /> 
            )
        }else {
            return(
                <Switch fullwidth ={true} label ={this.props.keyname} onUpdate = {(e)=>this.handleChange(e)} name = {this.props.name}  />  
            )
        }    
 };
}

