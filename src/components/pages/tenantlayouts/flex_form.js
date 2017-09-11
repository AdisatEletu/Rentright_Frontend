import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
var _ = require('lodash');

export  class Textarea extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
 handleInputChange = (event,name)=> {
   this.sendobj = {};
    var th = this;
    const target = event.target;    
    const value = target.value;  
    if (value != ''){
      let newshi = {};
      newshi[name] = value;
      this.setState(newshi);
      Object.assign(th.sendobj, newshi) ;
    }
    this.setState({
    [name]: value
    });
    this.props.onUpdate(th.sendobj)
  } 
    render(){
        return(
              <div className = { this.props.fullwidth ? "t-md-10 mod-input-cover no-pad " : "t-md-45 mod-input-cover  no-pad"  }>
                <div className = "label">{this.props.label}</div>
                <textarea className = "textarea" row = "20"  column = "15" placeholder = {this.props.label} type = "text" onChange = {(e) => this.handleInputChange(e,this.props.name)} ></textarea> 
          </div>
        );
    }
}
Textarea.PropTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    fullwidth: PropTypes.bool    

}



export  class Input extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
 handleInputChange = (event,name)=> {
   this.sendobj = {};
    var th = this;
    const target = event.target;    
    const value = target.value;  
    if (value != ''){
      let newshi = {};
      newshi[name] = value;
      this.setState(newshi);
      Object.assign(th.sendobj, newshi) ;
    }
    this.setState({
    [name]: value
    });
    this.props.onUpdate(th.sendobj)
  } 
    render(){
        return(
            <div className = { this.props.fullwidth ? "t-md-10 mod-input-cover " : "t-md-45 mod-input-cover "  }>
                <div className = "label">{this.props.label}</div>
                <input className = "input" placeholder = {this.props.label} type = "text" onChange = {(e) => this.handleInputChange(e,this.props.name)} /> 
          </div>
        );
    }
}
Input.PropTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    fullwidth: PropTypes.bool    

}

export  class Phone extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
 handleInputChange = (event,name)=> {
   this.sendobj = {};
    var th = this;
    const target = event.target;    
    const value = target.value;  
    if (value != ''){
      let newshi = {};
      newshi[name] = value;
      this.setState(newshi);
      Object.assign(th.sendobj, newshi) ;
    }
    this.setState({
    [name]: value
    });
    this.props.onUpdate(th.sendobj)
  } 
    render(){
        return(
            <div className = { this.props.fullwidth ? "t-md-10 mod-input-cover " : "t-md-45 mod-input-cover "  }>
                <div className = "label">{this.props.label}</div>
                <input className = "input" placeholder = {this.props.label} type = "number" onChange = {(e) => this.handleInputChange(e,this.props.name)} /> 
          </div>
        );
    }
}
Phone.PropTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    fullwidth: PropTypes.bool    

}


export  class ButtonGroup extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
    }
 handleClick = (name)=> {
      this.props.onUpdate()
  } 
    render(){
        return(
            <div className = "mod-button-container">
             {this.props.btnModes.map((item,index)=> {
              return(
              <button onClick = {()=>this.handleClick(item.label)} className = { item.size === "small" ? "mod-button mod-button-small"  : item.size === "mid" ? "mod-button mod-button-mid" : null} >
                  {item.value}
                </button>
              )
             })
             }
          </div>
        );
    }
}
ButtonGroup.PropTypes = {
    btnModes: PropTypes.array


}











export  class Select extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.opo;
    }
   componentDidMount(){
    if ( this.props.options){
      this.opo= this.props.options.map((item) => { 
        return <option key={item} value = {item}>{item}</option>;
      });
     this.setState({options : this.opo});
     console.log(this.opo);
     console.log('new select')

    }
    }
 handleSelectChange = (value,name)=> {
    console.log(value)
    console.log('select event')
   this.sendobj = {};
    var th = this;
    console.log(name) 
    if (value != ''){
      let newshi = {};
      newshi[name] = value;
      this.setState(newshi);
      Object.assign(th.sendobj, newshi) ;
    }
    this.setState({
    [name]: value
    });
    this.props.onUpdate(th.sendobj)
  } 

    render(){
        return(
            <div className = { this.props.fullwidth ? "t-md-10 mod-input-cover " : "t-md-45 mod-input-cover "  }>
                <div className = "label">{this.props.label}</div>
                <select placeholder = {this.props.label} className = "select" type = "text" onChange = {(e) => this.handleSelectChange(e,this.props.name)} >
                    <option default>Select one ...</option> 
                     {
                      this.opo
                     }
                 </select>
          </div>
        );
    }
}
Select.PropTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    fullwidth: PropTypes.bool,
    options: PropTypes.array

}
export  class Date extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.daysp = _.range(1,31);
        this.monthsp = [{value:1, label:'Jan'}, {value:2 ,label:'Feb'}, 
        {value:3, label:'Mar'}, { value:4 , label:'Apr'}, , {value:5, label:'May'}, { value:6,  label: 'Jun'}, 
        {value: 7, label: 'Jul'}, {value:8, label: 'Aug'}, { value:9 , label: 'Sep'},
        {value:10 , label:'Oct'}, { value:11 , label: 'Nov'}, {value:12 , label:'Dec'}];
        this.yearp = _.range(2016, 1900);
        this.value = ""; this.dayValue = ""; this.monthsvalue = ""; this.yearValue = "";
    }
   componentDidMount(){
     let days= this.daysp.map((item) => {         
        return <option key={item} value = {item}>{item}</option>;
      });
     let months= this.monthsp.map((item) => {         
        return <option key={item.label} value = {item.value}>{item.label}</option>;
      });
     let years= this.yearp.map((item) => {         
        return <option key={item} value = {item}>{item}</option>;
      });

     this.setState({days , months, years});
     console.log(this.state);
     console.log('new form state')

    }
    
 handleNameChange = (e, name)=>{
     let value = e.target.value;
     if (name === "Year"){
         this.yearValue  = value.toString();
          console.log(this.yearValue)
     }else if (name === "Month"){
          value = parseInt( e.target.value);
         if (value < 10){
         this.monthsValue = "0"+ value.toString();
         }else{
          this.monthsValue = value.toString();   
         }
        console.log(this.monthsValue)
     }else{
        value = parseInt( e.target.value);
        console.log(name)
        if (value < 10){
        this.dayValue = "0" + value.toString();
        }else{
         this.dayValue = value.toString();
        }
        console.log(this.dayValue)
         }

    if (this.dayValue != "" && this.monthsValue != "" && this.yearValue != ""){
             this.value = this.dayValue + "-" + this.monthsValue + "-" + this.yearValue
            
             this.handleSelectChange(this.value, this.props.name);
 }
 }
 handleSelectChange = (value,name)=> {
    console.log(value)
    console.log('select event')
   this.sendobj = {};
    var th = this;
    console.log(name) 
    if (value != ''){
      let newshi = {};
      newshi[name] = value;
      this.setState(newshi);
      Object.assign(th.sendobj, newshi) ;
    }
    this.setState({
    [name]: value
    });
    this.props.onUpdate(th.sendobj)
  } 

    render(){
        return(
            <div className = "t-flex t-md-10 t-flex-column">
            <div className = "label">{this.props.label}</div>
            <div className = "input-cover t-md-45 t-flex t-justify-space-between t-flex-row" >
            
            <div className = "mod-input-cover  t-md-2">
                <div className = "labeldate">Day</div>
                <select placeholder = "Day"  className  = "select"   onChange = {(e) => this.handleNameChange(e,'Day')} > 
                    <option default>Day</option>
                   {
                      this.state.days
                  }
                    </select>
          </div>
            <div className = "mod-input-cover  t-md-35">
                <div className = "labeldate">Month</div>
                <select placeholder = "Month"  className  = "select" onChange = {(e) => this.handleNameChange(e,'Month')} > 
                 <option default>Month</option>
                   {
                      this.state.months
                  }
                    </select>
          </div>
             <div className = "mod-input-cover  t-md-35">
                <div className = "labeldate">Year</div>
                <select placeholder = "Year"  className  = "select"  onChange = {(e) => this.handleNameChange(e,'Year')} > 
                  <option default>Year</option>
                   {
                      this.state.years
                  }
                    </select>
          </div>
         </div>
          </div>
        );
    }
}
Date.PropTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,

}