import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class CompletenessBar extends Component{
constructor(props){
super(props)
}
render(){
   let style1 = {width: this.props.completeness+ '%' };
   let style2 = {width : 100 - this.props.completeness + '%'};
    return ( 
        <div className = "t-md-10">          
            <div className = "m-heading m-med-topp t-flex t-flex-row t-align-left"><span>{this.props.label}</span><span className = "lbl">{this.props.completeness} %</span></div>     
            <div className = "t-flex  t-md-10 t-justify-left t-flex-row ">
              <div className = "t-flex t-md-10 t-align-top t-justify-center">
                  <div className = "t-flex t-flex-column t-md-10  t-justify-center t-sup-h3 t-gray-darken-3-f Roboto t-center-f  thin t-align-top">
                      <div className = "t-flex t-flex-row   t-md-8">
                          <div className = "m-total-bar" style={style1}></div>
                      <div className = "m-total-barw"  style={style2}></div>
                      </div>
                      </div>
                  </div>
              </div>  
              </div>         
    )//return
}//render
}
 CompletenessBar.PropTypes = {
    completeness: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired


}
export default CompletenessBar;