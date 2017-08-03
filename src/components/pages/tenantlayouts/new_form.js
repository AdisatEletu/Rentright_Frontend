import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Radio from  'antd/lib/radio';
import  Input from 'antd/lib/input';
import Col from 'antd/lib/col';
import  Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import  DatePicker from 'antd/lib/date-picker'; 
import  AutoComplete from 'antd/lib/auto-complete';
import  Cascader from 'antd/lib/cascader';
import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
//import Select from 'antd/lib/select'
const InputGroup = Input.Group;
//const Option = Select.Option;

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Option, OptGroup } = Select;
class NewForm extends Component{
    constructor(props){
        super(props)  
        this.state = Object.assign({},this.props.ownstate)    
        this.sendobj = {}
        this.radiogroup = false;
        this.text = false; this.switch = false; this.select = false;
        console.log(this.props.label)
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
    this.sendobj = {};
    console.log(this.props.data)
     }
 handleInputChange = (event)=> {
   this.sendobj = {};
    var th = this;
    const target = event.target;    
    console.log(target.value)
    const name = target.value;  
    const value = target.value;  
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
            this.text ?
        
        <div className = "new-form-item2 t-flex-left">   
            <div className = "new-form-label m-ellispis">
                {this.props.keyname}
             </div> 
             <div className = "new-form-form t-md-45"> 
            <Col span={24}>
            <Input  prefix={<Icon type="tag" />} defaultValue={this.state[this.props.name] } placeholder = {this.props.keyname}    onChange = {this.handleInputChange} />  
           </Col>
            </div>   
        </div> 
             :  
             this.switch ?
         <div className = "new-form-item2 t-flex-left">   
         <div className = "new-form-label m-ellispis">
                {this.props.keyname}
             </div> 
             <div className = "new-form-form t-md-45"> 
             <Switch checkedChildren={<Icon type="check" />}  size="small"  unCheckedChildren={<Icon type="cross" />} defaultChecked = {this.state[this.props.name]}  onChange = { (e)=> this.handleSwitchChange(e,this.props.field) }/>

            </div>   
        </div> 
             :
         this.select ?
         <div className = "new-form-item2 t-flex-left">   
         <div className = "new-form-label m-ellispis">
                {this.props.keyname}
             </div> 
             <div className = "new-form-form t-md-45"> 
             <Select defaultChecked = {this.state[this.props.name]}  onChange = { (e,label)=> this.handleSwitchChange(e,this.props.field) } placeholder =  {this.props.keyname} >
                 <OptGroup label = "Select one">
                    {this.props.options.map((item, index)=>{
                        return(<Option key ={index} value = "item">item</Option>)
                    })
                    
                    }

                 </OptGroup>


                 </Select>

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