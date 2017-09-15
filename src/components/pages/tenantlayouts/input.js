
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component{
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
            <div className = {"input-cover "+ this.props.fullwidth ? "t-md-10" : "t-md-45" }>
                <div className = "label">{this.props.label}</div>
                <input className = "input" placeholder = {label} type = "text" onChange = {(e) => this.handleInputChange(e,this.props.name)} /> 
          </div>
        );
    }
}
Input.propTypes = {
    onUpdate: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: Proptypes.string,
    fullwidth: PropTypes.bool    

}