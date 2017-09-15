
import React, {Component} from 'react';
import PropTypes from 'prop-types';
var _ = require('lodash');
export default class Select extends Component{
    constructor(props){
        super(props)
        this.state = {}
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

    render(){
        return(
            <div className = {"Select-cover "+ this.props.fullwidth ? "t-md-10" : "t-md-45" }>
                <div className = "label">{this.props.label}</div>
                <select placeholder = {label} type = "text" onChange = {(e) => this.handleSelectChange(e,this.props.name)} > 
                   {
                      this.state.options
                  }
                    </select>


          </div>
        );
    }
}
Select.propTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: Proptypes.string,
    fullwidth: PropTypes.bool,
    options: PropTypes.array

}