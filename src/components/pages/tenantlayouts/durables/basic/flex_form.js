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
              <div className = { "t-md-8 mod-input-cover no-pad " }>
                <div className = "d-label">{this.props.label}</div>
                <textarea className = "d-textarea" rows = "8"  placeholder = {this.props.label} cols = "15"  onChange = {(e) => this.handleInputChange(e,this.props.name)} ></textarea> 
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
                <span className = "d-label">{this.props.label}</span>
                <input className = "d-input" placeholder = {this.props.label} type = "text" onChange = {(e) => this.handleInputChange(e,this.props.name)} /> 
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

export  class ButtonGroup extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.retobj = {};
        this.constructed  = false;
     this.handleClick = this.handleClick.bind(this);
    }
 componentDidMount(){
     this.props.children.map((item)=>{ 
         var va = item.value;   
         let obj = {}  
         obj[item.value]  = false 
         this.setState(obj);
         this.constructed = true
     })
 }
 handleClick = (action, label)=> {
   var val = action.value;
   var keys = Object.keys(this.state);
   if (! this.state[action.value]){         
       let obj = {}
      obj[action.value]  = true        
       this.setState(obj,()=>{       
       })
  
   keys.map((item)=>{
    if (item !== action.value){
    let  obj = {}
    obj[item] = false
    this.setState(obj, ()=>{
         this.props.onUpdate(this.state)
    });
     }
})
   }
 
  } 
    render(){
        return(
     <div className = {"t-md-10 mod-input-cover " }>  
      <div className = "d-btngroup">
        <div className = "d-label">{this.props.label}</div>
        <div className = "d-btnlist">
        {
            this.props.children.map((item,index)=>{
        return (
          <div className = {
              this.constructed ?
              this.state[item.value] ? " d-aa daaselected":" d-aa" 
              :
              'd-aa'
          
              }  
          
          key = {index} onClick = {()=>this.handleClick(item, item.label)} >
            {item.label}  
          </div>
                )
            })
        }
        </div>
        </div>
        </div>
        );
    }
}
ButtonGroup.PropTypes = {
    onUpdate: PropTypes.func,
    children: PropTypes.array,
    label:PropTypes.string,


}


export  class Switch extends Component{
    constructor(props){
        super(props)
        this.state = {truthy:false, falsy:false}  
        this.handleClick = this.handleClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }
onUpdate(value, action){
    let obj = {}
    obj[value] = action;
    this.props.onUpdate(obj);
}

 handleClick = (action)=> {
   if (action){
       if (!this.state.truthy){
       this.setState({truthy: true},()=>{
           this.setState({falsy: false},()=>{
           this.onUpdate(this.props.name, action);
           })
       });  
       }       
   }else{
    if(!this.state.falsy){
    this.setState({truthy: false},()=>{
      this.setState({falsy: true},()=>{
      this.onUpdate(this.props.name, action);
      });
       }); 
    }
   }
  
  } 
    render(){
        return(
     <div className = {"t-md-45 mod-input-cover " }>  
      <div className = "d-btngroup">
        <div className = "d-label">{this.props.label}</div>
        <div className = "d-btnlist">           
          <div className =  {
              this.state.truthy ? 'dd-active d-aa':
              'd-aa dd-passive'
               }                       
          onClick = {()=>this.handleClick(true)} >
            <Icon type = "check" style = {this.state.truthy ?{color:'#7cbf49',fontSize:15}:{color:'#ccc', fontSize:15}} />
             &nbsp;&nbsp;True 
          </div>   
        <div className = {
            this.state.falsy ? 'dd-active d-aa':
             'd-aa dd-passive'
        }                        
          onClick = {()=>this.handleClick(false)} >
            <Icon type = "close" style = {this.state.falsy ?{color:'#7cbf49', fontSize:15}:{color:'#ccc', fontSize:15}} />
             &nbsp;&nbsp;False 
          </div>     
        
        </div>
        </div>
        </div>
        );
    }
}
Switch.PropTypes = {
    onUpdate: PropTypes.func,    
    label:PropTypes.string,
    value:PropTypes.string


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
                <div className = "d-label">{this.props.label}</div>
                <input className = "d-input" placeholder = {this.props.label} type = "number" onChange = {(e) => this.handleInputChange(e,this.props.name)} /> 
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


export  class Buttonsbm extends Component{
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
Buttonsbm.PropTypes = {
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
   }
    }
 handleSelectChange = (value,name)=> {
    this.setState({ ret:
   { [name]: value}
    }, ()=>{  
    this.props.onUpdate(this.state.ret);
    }
   
    );
  } 

    render(){
        return(
            <div className = { this.props.fullwidth ? "t-md-10 mod-input-cover " : "t-md-45 mod-input-cover "  }>
                <div className = "d-label">{this.props.label}</div>
                <select placeholder = {this.props.label} className = "d-select" type = "text" onChange = {(e) => this.handleSelectChange(e.target.value,this.props.name)} >
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
            <div className = "d-label">{this.props.label}</div>
            <div className = "input-cover t-md-45 t-flex t-justify-space-between t-flex-row" >
            
            <div className = "mod-input-cover  t-md-2">
                   <select placeholder = "Day"  className  = "d-select"   onChange = {(e) => this.handleNameChange(e,'Day')} > 
                    <option default>Day</option>
                   {
                      this.state.days
                  }
                    </select>
          </div>
            <div className = "mod-input-cover  t-md-35">
                 <select placeholder = "Month"  className  = "d-select" onChange = {(e) => this.handleNameChange(e,'Month')} > 
                 <option default>Month</option>
                   {
                      this.state.months
                  }
                    </select>
          </div>
             <div className = "mod-input-cover  t-md-35">
                <select placeholder = "Year"  className  = "d-select"  onChange = {(e) => this.handleNameChange(e,'Year')} > 
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