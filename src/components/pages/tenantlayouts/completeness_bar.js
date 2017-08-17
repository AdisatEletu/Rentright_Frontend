import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Progress  from  'antd/lib/progress';

class CompletenessBar extends Component{
constructor(props){
super(props)
}
render(){
   let style1 = {width: this.props.completeness+ '%' };
   let style2 = {width : 100 - this.props.completeness + '%'};
   let itswithinformwidth= this.props.withinform ? "t-md-10" :"t-md-6";
   let itswithinformwidget = this.props.withinform ? "p-widget m-padding":""
    return ( 
        <div className = { "t-md-10 m-topp2 " +itswithinformwidget  }>  
            <div className = "m-heading2  mid t-flex t-flex-row t-align-left"><span>{this.props.label}</span><span className = "lbl"></span></div>   
            <div className = "il-m-thin">Please proceed with your registeration, please note profiles with updated information are rated higher on our system</div>
            <div className = "t-flex t-md-10 t-flex-row t-justify-space-between t-align-center">
            <div className = {"t-flex  t-md-6 t-justify-left t-flex-row  "  + itswithinformwidth}>
              <div className = "t-flex t-md-10 t-align-top t-justify-center">
                  <div className = "t-flex t-flex-column t-md-10  t-justify-center t-sup-h3 t-gray-darken-3-f Roboto t-center-f  thin t-align-top">
                      <div className = "t-flex t-flex-row   t-md-8">
                           <Progress percent= {this.props.completeness} status="active" />
                      </div>
                      </div>
                  </div>

               <div className = "t-md-3 t-flex t-align-center t-justify-center">
                   <Progress type="circle" percent={this.props.completeness}  />

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