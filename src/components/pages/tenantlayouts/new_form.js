import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Radio from  'antd/lib/radio';
import  Input from 'antd/lib/input';
import moment from 'moment';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import  DatePicker from 'antd/lib/date-picker'; 
import  AutoComplete from 'antd/lib/auto-complete';
import  Cascader from 'antd/lib/cascader';
import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
import Select from 'antd/lib/select'
import 'moment/locale/en-gb';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

moment.locale('en');
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { OptGroup } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';
class NewForm extends Component{
    constructor(props){
        super(props)  
        this.state = Object.assign({options:[]},this.props.ownstate)    
        this.sendobj = {}
        this.options;
        this.radiogroup = false;
        this.text = false; this.switch = false; this.select = false; this.textarea; this.phone = false; this.date = false;
        console.log(this.props.options)
         console.log('Option Vlues')
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleSwitchChange = this.handleSwitchChange.bind(this);   
       this.handleRadioChange = this.handleRadioChange.bind(this);
       if (this.props.datatype == "formgroup"){
         this.radiogroup = true;
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
        console.log(this.props.datatype);
        console.log('phone was successfully passed')
    }
    else { 
        this.date = true; 
    }
    this.sendobj = {};
    console.log(this.props.data)
     }
   componentWillMount(){
    if ( this.props.options){
      let opo= this.props.options.map((item) => { 
        return <Option key={item} value = {item}>{item}</Option>;
      });
     this.setState({options : opo});
     console.log(this.state);
     console.log('new form state')

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

handleDateChange = (values,name)=> {
   let value =   moment(value).format('YYYY-MM-DD');
       console.log(value)
    console.log('date event')
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






 handleInputChange = (event,name)=> {
    console.log(event)
    console.log('select event')
   this.sendobj = {};
    var th = this;
    const target = event.target;    
    //console.log(target)
    //const name = target.name;  
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
  handleRadioChange = (event) =>{
    this.sendobj = {};
    var target = event.target;    
    const value =  target.value;
    console.log(value)
    var namelist = this.props.data.filter((i)=>{
        this.setState({
            i : false          
        })
        if (i == value){
            return i
        }

    });
    var name = namelist[0]    
    console.log(name);
    //const name = target.name;
    this.setState({
     [name] : true
    })

  this.sendobj = {[name] : true}
    console.log(this.sendobj)
      this.props.onUpdate(this.sendobj)
  }
    handleSwitchChange = (event, name) =>{
    this.sendobj = {};
    var value = event;
    console.log(value);
    this.setState({
     [name] : value 
    })
    this.sendobj = {[name] : value}
      this.props.onUpdate(this.sendobj)
  }
        render (){                  
           return (
         <div className = "t-md-10">
            { this.radiogroup ?   
            <div className = "new-form-item t-flex-left">
                <div className = "new-form-label">
                {this.props.keyname}
                </div>
                <div className = "new-form-form ">              
                    <RadioGroup  onChange = {this.handleRadioChange} >  
                    { this.props.data.map((item,index)=>{                       
                       return( <RadioButton  key = {index}  value = {item} >{this.props.label[item].keyname}</RadioButton >)
                    })                                      
                    }  
                    </RadioGroup>
            
                 </div>
                 </div>
         
       
            :
            this.text || this.textarea || this.phone || this.date ?
        
        <div className = "new-form-item2 t-flex-left">   
            <div className = "new-form-label m-ellispis">
                {this.props.keyname}
             </div> 
             <div className = "new-form-form t-md-9"> 
           
            {this.text ?
            <Input  prefix={<Icon type="tag" />} defaultValue={this.state[this.props.name] } placeholder = {this.props.keyname}  size = "large"   onChange = {(e) => this.handleInputChange(e,this.props.name)} />  
            :
            this.textarea ?
            <TextArea  rows={7}  prefix={<Icon type="tag" />} defaultValue={this.state[this.props.name] }  placeholder = {this.props.keyname}    onChange = {(e) => this.handleInputChange(e,this.props.name)} /> 
            :
            this.phone ?
         <InputGroup size="large"> 
         <Col span={4}>
            <Input defaultValue="234" /> </Col> <Col span={15}> <Input defaultValue="" placeholder = {this.props.keyname}   onChange = {(e)=> this.handleInputChange(e,this.props.name)}  /> </Col> </InputGroup>
            :
            this.date ?
            <DatePicker size="large"  onChange = {(e)=> this.handleDateChange(e,this.props.name)} format={dateFormat} placeholder = {this.props.keyname}  />
            :
            null
            } 
      
            </div>   
        </div> 
             :  
             this.switch ?
         <div className = "new-form-item2 t-flex-left">   
         <div className = "new-form-label m-ellispis">
                {this.props.keyname}
             </div> 
             <div className = "new-form-form t-md-9"> 
             <Switch checkedChildren={<Icon type="check" />}  size="large"  unCheckedChildren={<Icon type="cross" />} defaultChecked = {this.state[this.props.name]}  onChange = { (e)=> this.handleSwitchChange(e,this.props.field) }/>

            </div>   
        </div> 
             :
         this.select ?
         <div className = "new-form-item2 t-flex-left">   
         <div className = "new-form-label m-ellispis">
                {this.props.keyname}
             </div> 
             <div className = "new-form-form t-md-45"> 
           { this.props.options ?
             <Select defaultChecked = {this.state[this.props.name]}  style = {{width:280}} onChange = { (e,label)=> this.handleSelectChange(e,this.props.name) } placeholder = {this.props.keyname}  >
                        {
                      this.state.options
             
                        }
                 </Select>
                 :
                 null
           }
            </div>   
        </div> 
             :
             <div>No switch</div>
                  
                  
                  
                  
                    }
            </div>            
        )
        

        
    
 };
};
   
export default NewForm;