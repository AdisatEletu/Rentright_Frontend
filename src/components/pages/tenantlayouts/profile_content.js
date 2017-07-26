import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class  ProfileContent extends Component{
constructor(props){
super(props);
//this.identifiers = Object.keys(this.props.identifiers);
//this.otheridentifiers = Object.keys(this.props.otheridentifiers);

}


render(){
    return ( 
       
      <div className = "profile-block">
          <div className = "profile-head-block">
              <div className = "profile-key">{this.props.keyName}</div>
          </div>
           <div className = "profile-body-block">
             <div className = "profile-value">{this.props.value}</div>
           </div>
          </div>


            
      
         
    )//return
}//render
}
 ProfileContent.PropTypes = {
    identifiers: PropTypes.object.isRequired,
   // otheridentifiers: PropTypes.objects.isRequired


}
export default ProfileContent;