import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class  ProfileBar extends Component{
constructor(props){
super(props);
this.identifiers = Object.keys(this.props.identifiers);
this.otheridentifiers = Object.keys(this.props.otheridentifiers);

}


render(){
    return ( 

        <div className = "t-md-10 t-flex t-justify-space-around t-flex-row profilebar t-align-stretch palign-content-center">    
            <div className = "t-md-2 t-flex t-fullheight t-align-center t-justify-left"><div className = "p-thumbnail" ></div></div>    
            <div className = "t-md-7 t-flex t-fullheight t-flex-column tjustify-left" >
                <div className = "p-profile-name">{this.props.first_name} {this.props.last_name}</div>
                <div className = "t-flex t-flex-column t-md-10 p-group">
                {  this.identifiers.map ( (item, index)=>{  
                    return (
                         <div className  = "t-md-7 t-flex pre-hack " key= {index}>
                             {  item == "address" && this.props.identifiers.address ?  
                          <div className  = "list t-md-10 t-flex t-justify-space-between p-desc t-flex-row" key = {index}><div className = "p-bolden">{item}</div> {this.props.identifiers.address.address} <div className = "p-highlight"></div></div>                             
                             : 
                               <div className  = "list t-md-10 t-flex t-justify-space-between p-desc t-flex-row" key = {index}><div className = "p-bolden">{item}</div>{this.props.identifiers[item]}<div className = "p-highlight"></div></div>
                             }
                         
                          </div>   
                    )
                })                              
                }
                </div>
              <div className = "t-flex t-md-10 p-group common t-align-space-between t-flex-row p-desc">
                  <i className = "p-highlight fa fa-facebook"> </i> <i className = "p-highlight fa fa-twitter"> </i> <i className = "p-highlight fa fa-pinterest"> </i> <i className = "p-highlight fa fa-linkedin"> </i><i className = "p-highlight fa fa-instagram"> </i>
                  </div>
             </div>            
              </div>     
         
    )//return
}//render
}
 ProfileBar.PropTypes = {
    identifiers: PropTypes.object.isRequired,
   // otheridentifiers: PropTypes.objects.isRequired


}
export default ProfileBar;