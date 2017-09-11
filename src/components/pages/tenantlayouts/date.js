
import React, {Component} from 'react';
import PropTypes from 'prop-types';
var _ = require('lodash');
export default class Date extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.daysp = _.range(1,31);
        this.monthsp = [{value:1, label:'Jan'}, {value:2 ,label:'Feb'}, 
        {value:3, label:'Mar'}, { value:4 , label:'Apr'}, , {value:5, label:'May'}, { value:6,  label: 'Jun'}, 
        {value: 7, label: 'Jul'}, {value:8, label: 'Aug'}, { value:9 , label: 'Sep'},
        {value:10 , label:'Oct'}, { value:11 , label: 'Nov'}, {value:12 , label:'Dec'}];
        this.yearp = _.range(2016, 1900);
        this.value = ""; this.daysvalue = ""; this.monthsvalue = ""; this.yearvalue = "";
    }
   componentWillMount(){
    if ( this.props.options){
      let days= this.daysp.map((item) => {         
        return <Option key={item} value = {item}>{item}</Option>;
      });
     let months= this.monthsp.map((item) => {         
        return <Option key={item.label} value = {item.value}>{item.label}</Option>;
      });
     let years= this.yearp.map((item) => {         
        return <Option key={item} value = {item}>{item}</Option>;
      });

     this.setState({days , months, years});
     console.log(this.state);
     console.log('new form state')

    }
    }
 handleNameChange = (value, name)=>{
     if (name === "Year"){
         this.yearValue  = value.toString();
     }else if (name === "Month"){
         if (value < 10){
         this.monthsvalue = "0"+ value.toString();
         }else{
          this.monthsvalue = value.toString();   
         }
     }else{
        if (value < 10){
        this.daysvalue = "0" + value.toString();
        }else{
         this.daysvalue = value.toString();
        }
     }
    if (this.daysvalue != "" && this.monthsvalue != "" && this.yearvalue != ""){
             this.value = this.daysvalue + "-" + this.monthsvalue + "-" + this.yearvalue
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
            <div className = "mod-input-cover t-md-10 t-flex t-justify-space-between t-flex-row" >
            
            <div className = "input-cover  t-md-2">
                <div className = "label">Day</div>
                <select placeholder = "Day" type = "text" onChange = {(e) => this.handleNameChange(e,this.props.name)} > 
                   {
                      this.state.days
                  }
                    </select>
          </div>
            <div className = "input-cover  t-md-35">
                <div className = "label">Month</div>
                <select placeholder = "Month" type = "text" onChange = {(e) => this.handleNameChange(e,this.props.name)} > 
                   {
                      this.state.months
                  }
                    </select>
          </div>
             <div className = "input-cover  t-md-35">
                <div className = "label">Year</div>
                <select placeholder = "Year" type = "text" onChange = {(e) => this.handleNameChange(e,this.props.name)} > 
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
Date.propTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: Proptypes.string,

}