import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class  ProfileBar extends Component{
constructor(props){
super(props);
//this.identifiers = Object.keys(this.props.identifiers);
//this.otheridentifiers = Object.keys(this.props.otheridentifiers);

}


render(){
    return ( 
          <div>
        <div className = "t-md-10 t-flex t-justify-center t-align-bottom stars">   
            <div className = "prof-desc">Update your Profile picture <i className = "fa fa-camera"></i></div>             
          </div>
         <div className = "p-sub-star t-md-10 t-flex t-flex-column t-align-top t-justify-center">        
        <div className = "t-flex t-md-10 t-flex-column  t-align-center t-fullheight t-justify-center "> 
            <div className = "p-thumbnail" ></div>
          <span className = "t-center-f profile-head m-ellipses top m-top-sm2">Felixson Yusuf Tosin</span>
          <span className = "t-center-f profile-body m-ellipses  ">Enterprise Software Developer</span>
          <span className = "t-center-f profile-body m-ellipses  ">felixsonyusuftosin@gmail.comr</span>
          <div className = "about-me">
              I am Lorem ipsusim magic in egyt over soma lorem ipsum somas never will erry make sure
              I am Lorem ipsusim magic in egyt over soma lorem ipsum somas never will erry make sure
              I am Lorem ipsusim magic in egyt over soma lorem ipsum somas never will erry make sure
               </div>
        </div>         
          </div>
          <div className = "p-widget t-md-10  application-history  m-pad-zero t-flex-row  t-flex">
              <div className = "t-flex t-align-center t-fullheight t-justify-center t-md-1 p-big-icons p-blue p-blue-b"> <i className = "fa fa-star"></i></div>
              <div className = "t-col-3 t-fullheight t-align-center t-justify-center t-flex t-flex-row p-blue-b">
                  <div className ="p-big-icons p-blue t-md-2">5</div>
                   <div className  ="t-md-6 p-small-icons">Applications made in recent months </div>
                   </div>
                <div className = "t-col-3 t-fullheight t-align-center t-justify-center t-flex t-flex-row p-blue-b">
                  <div className ="p-big-icons p-blue t-md-2">2</div>
                   <div className  ="t-md-6 p-small-icons">Applications considered by landlord, pending authorization</div>
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