import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

//required props  
//context:obj{type:string, size:string(full, half) ownstate:obj, name:string, initialvalue:any, icons:string, label:string}
//scale:boolean
//childLabel:string
//label:string
//isActive:boolean


class FormElements extends Component{
    constructor(props){
        super(props)
        try{
        this.state = Object.assign({},this.props.ownstate)
      }catch(err){
        
         this.state = [[],...this.props.ownstate]
        }
        this.sendobj = {}
        this.handleInputChange = this.handleInputChange.bind(this);   
        this.handleRadioChange = this.handleRadioChange.bind(this);  
     console.log("passsed in size");
    console.log(this.props.size)
            }
 handleInputChange = (event)=> {
   this.sendobj = {};
    var th = this;
    const target = event.target;
    console.log(target.value)
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.value;
    if (value != ''){
      let newshi = {};
      newshi[target.name] = value;
      this.setState(newshi);
      Object.assign(th.sendobj, newshi) ;
    }
    this.setState({
    [name]: value
    });
    this.props.onUpdate(th.sendobj)
  } 
  handleRadioChange = (event) =>{
    this.sendobj = {};
    var target = event.target;
    this.setState
    const value =  target.value;
    console.log(value);
    const name = target.name;
    this.setState({
     [name] : value 
    })
    this.sendobj = {[name] : value}
      this.props.onUpdate(this.sendobj)
  }
        render (){
        
        return (
          this.props.type == "textbox" || this.props.type =="date" ||this.props.type == "textarea" ?
              <div className =  {"m-self-form "+ this.props.size  } >  
     
                     <label for={"st_" +this.props.name} className = "active" >{this.props.label}</label>         
                    <div>
                     <i className="material-icons small">{this.props.icons}</i>   
                     {    this.props.type == "textbox" ?               
                       <input placeholder={this.props.label} id = {"st_" +this.props.name} name = {this.props.name} onChange = {this.handleInputChange} value = {this.state[this.props.name]}   type="text"  className="validate"/> 
                          :
                          this.props.type == "textarea" ?
                          <textarea placeholder={this.props.label} rows = "12" cols = "34" id = {"st_" +this.props.name} name = {this.props.name} onChange = {this.handleInputChange} value = {this.state[this.props.name]}   type="text"  className="validate"></textarea>
                          :
                        <input placeholder={this.props.label} id = {"st_" +this.props.name} name = {this.props.name} onChange = {this.handleInputChange} value = {this.state[this.props.name]}   type="date"  className="validate"/>     
                            
                                 }                    
                        </div>                  
             
                  </div>            
                  :
          <div className="m-form-hold-check t-flex-column"> 
       <div className = "m-form-check">
      <div className = "t-md-4 t-flex t-align-top">
       <span className = "m-heading text-wrap" htmlFor={this.props.name + "_yes"} >{this.props.label}</span>
    </div>
    <div className = "t-md-1  t-flex t-flex-column  t-align-content-space-between">
        <span className ="t-h3" >Yes</span>      
        <div className = "m-inp-top"><input  type="radio"  onChange = {this.handleRadioChange} value = {true}  name = {this.props.name}  className ="" id={this.props.name + "_yes"}/></div>        
       </div>
    <div className = "t-md-1  t-flex t-flex-column  t-align-content-space-between">
      <span className ="t-h3" >No</span>   
       <div className = "m-inp-top"> <input  type="radio"  onChange = {this.handleRadioChange}  value = {false}  name = {this.props.name}  className =""  id={this.props.name + "_no"} /></div>
    </div>
    <div className = "t-md-2  t-flex t-justify-center  t-align-top">
      <div className ="default thin" ><b>Value: </b>&nbsp;{this.props.ownstate[this.props.name]? 'True' : 'False'}</div>   
    
    </div>


   </div>
   </div>
        )

      }
      
      //render
        
    
 }
    FormElements.PropTypes = {
    context: PropTypes.object.isRequired


}
export default FormElements;