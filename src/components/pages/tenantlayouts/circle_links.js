import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

//required props  
//linkTo:string
//scale:boolean
//childLabel:string
//label:string
//isActive:boolean


 class CircleLinks extends Component{
    constructor(props){
        super(props)
            }
        render (){
return (
        <NavLink className = {"m-balls-hold " + (this.props.scale ? 'm-small-scale' : "" ) }  to = {this.props.linkTo} >
        <div className = {"m-balls m-ellipses " +(this.props.scale ? 'm-balls-active' : "" )}  >{this.props.label}</div>
        <div className = "m-balls-text m-ellipses">{this.props.childLabel}</div>
        </NavLink>         
         
        );//return

        }//render
        
    
 }
  CircleLinks.PropTypes = {
    childLabel: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    scale: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired


}
export default CircleLinks;