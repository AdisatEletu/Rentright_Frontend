import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {update} from '../../../state/actions/userActions';


class T_left extends Component{
    constructor(props) {
        super(props)
        this.state = {          
            tenantReducer: this.props.tenantReducer
        }
    console.log(this.state)
    }
  

   render(){  

        const {auth} = this.props;
        console.log(auth)
         const id = auth.user.uuid;
        const uuid = auth.user.uuid;
        return(
                <div className = "t-left t-gray  t-flex  t-align-content-space-between t-right-bx t-right-bx t-flex-column">
                    <div className = "t-justify-left t-flex">
                        <NavLink to = "/" className = " um t-flex-2 t-contain m-logo ">                
                        </NavLink>
                    </div>
            
                    <div className = " t-justify-center t-flex">        
                    <div className = "t-rounded m-prf t-white t-cover m-me">  
                        <div className = "m-cover t-flex t-align-center t-fullheight t-fullwidth t-justify-center"> <i className = "material-icons  md-12 right">NavLinked_camera</i> </div>           
                    </div>
                    </div>
            
                    <div className = " t-justify-center t-flex t-center-f  t-flex-column t-justify-center m-top-sm ">        
                        <span className = "roboto t-h4 t-space-1 mid t-uppercase  m-bluish-f block">{auth.user.first_name} {auth.user.last_name}</span>
                        <span className = "open-sans t-h5 mid semi-bold m-bluish-f block">{auth.user.email}</span>
                        <div className = "t-center-f  t-gray-lighten-1-f t-flex m-top t-h6  t-justify-center t-md-10"><i className="material-icons">bubble_chart</i></div>
                    </div>
            <div className = "t-flex t-flex-column m-top-med">
                <NavLink className = "m-nav-li t-md-10" to = "/tenant/profile/:id" activeClassName ="m-active-nav"><i className = "fa fa-user-circle lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">Complete Profile</span> <div className = "t-bullet m-activate">30 %</div> </NavLink>
                <NavLink className = "m-nav-li t-md-10" to = "/tenant/applications/:id"   activeClassName="m-active-nav"><i className = "fa fa-bookmark-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Applications</span><div className = "t-bullet"></div> </NavLink>
                    <NavLink className = "m-nav-li t-md-10"  to = "/tenant/serviceproviders/:id" activeClassName = "m-active-nav"><i className = "fa fa-handshake-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">Service Providers</span> <div className = "t-bullet"></div> </NavLink>
                        <NavLink className = "m-nav-li t-md-10"  to = "/tenant/messages/:id"  activeClassName = "m-active-nav"><i className = "fa fa-envelope-open-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses ">Messages</span> <div className = "t-bullet"></div> </NavLink>
                            <NavLink className = "m-nav-li t-md-10"  to = "/tenant/propertysearch/:id" activeClassName = "m-active-nav"><i className = "fa fa-building-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses"> Find Properties</span> <div className = "t-bullet m-activate">10 new</div> </NavLink>
            </div>
                </div>

        );
    }
}
function matchStateToProps(state){
    return {
        auth: state.user.auth,
        tenantReducer: state.tenantProfile,
    }
}

T_left.propTypes = {
    auth: PropTypes.object.isRequired,

}
export default connect(matchStateToProps,{update})(T_left)