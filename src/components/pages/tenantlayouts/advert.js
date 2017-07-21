import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

//required props  
//context:obj{type:string, size:string(full, half) ownstate:obj, name:string, initialvalue:any, icons:string, label:string}
//scale:boolean
//childLabel:string
//label:string
//isActive:boolean


class Advert extends Component{
    constructor(props){
        super(props)
    }
render (){        
        return (
          <div className = "t-flex t-flex-column t-advert t-flex t-flex-column">
                    <div className = "m-heading">Featured Property</div>
                    <div className = "m-sub">Based on proximity</div>
                    <div className = "t-gray-darken-4-f t-h3 t-flex t-align-center postmid t-capitalize t-space-1 t-md-10 m-ellipses t-capitalize t-justify-left"><i className = "material-icons small t-gray-ligthen-3-f ">dashboard</i>&nbsp;&nbsp;
                    <span>3 Bedroom Apartment</span></div>
                    <div className = "m-advert-img"></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">av_timer</i><span>Uploaded at : 16/07/2017 4:53 PM</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">person_pin</i><span>Odaibo Amadosi</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">credit_card</i><span>Asking Price N800, 000</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "material-icons small">assessment</i><span>Average rate N500, 000</span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  m-bl "><i className = "material-icons small">store</i><span>House description&nbsp;&nbsp;<i className = "fa fa-angle-down"></i> </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "fa fa-circle "></i><span>2 bedroom </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid   "><i className = "fa fa-circle "></i><span>2 toilets </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  "><i className = "fa fa-circle "></i><span>Carport  </span></div>
                    <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f postmid  m-bl "><i className = "material-icons small">person_pin</i><span>contact&nbsp;&nbsp;<i className = "fa fa-angle-down"></i> </span></div>
                     <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f mid m-bl  "><i className = "m-contact"></i><span>Felixson Yusuf Tosin</span></div>
                     <div className = "m-desc t-h4 t-align-center t-md-10 t-gray-darken-1-f mid m-bl  "><i className = "m-contact"></i><span>Odaibo Amadosi</span></div>
                     <div className = "m-related">
                         <div className = "m-heading">Related Properties</div>
                          <div className = "m-sub">Based on proximity</div>
                             <div className = "m-item t-flex t-flex-row">
                                 <div className ="t-flex t-md-4   t-justify-center t-align-left open-sans"><div className = "t-md-8 m-shows m-house2"></div></div>
                                 <div className = "t-flex-t-md-6 t-flex   t-gray-lighten-1-f t-flex t-align-center t-align-content-center t-justify-left t-flex-column pd">
                                     <div className ="t-h3 t-gray-darken-1-f m-text-right t-uppercase m-ellipses t-md-10">3 bedroom flats</div>
                                     <div className ="t-h3 semi-thin  m-ellipses t-md-10">Iyana Oworo </div>
                                     <div className ="t-h4 semi-thin  m-ellipses t-md-10">Off Lagos island lagos </div>
                                 </div>
                             </div>
                      <div className = "m-item t-flex t-flex-row">
                                 <div className ="t-flex t-md-4   t-justify-center t-align-left open-sans"><div className = "t-md-8 m-shows m-house3"></div></div>
                                 <div className = "t-flex-t-md-6 t-flex   t-gray-lighten-1-f t-flex t-align-center t-align-content-center t-justify-left t-flex-column pd">
                                     <div className ="t-h3 t-gray-darken-1-f m-text-right t-uppercase m-ellipses t-md-10">Serviced Apartment</div>
                                     <div className ="t-h3 semi-thin  m-ellipses t-md-10">Ikoyi </div>
                                     <div className ="t-h4 semi-thin  m-ellipses t-md-10">Ikoyi Lagos </div>
                                 </div>
                             </div>
                         </div>
                    </div>
        )

      }
      
      //render
        
    
 }
   


export default Advert;