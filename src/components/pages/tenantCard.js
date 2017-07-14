import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {update} from '../../state/actions/userActions';


class TenantCard extends Component{
    constructor(props) {
        super(props)  
              console.log(this.props)
        
    }  

    render(){
        //const pathtext = this.props.params.attribute;
    //const uuid = this.props.params.id;
    const {  title,   icon, subtitle, percentage} = this.props;
    const {results} = this.props.tenantReducer.tenants
    console.log(results)
    var completion = 10 // parseInt(profile.completed)
    let color =()=>{
    if ( completion < 50 ){
        return '#FAA519'
    }else{
        return '#66BB6A'
    }
    }
     var style = {
         color: color(),
         width: completion + '%'
         };

        return(            
        <div className = "m-card">
                <div className = "m-card-top">
                    <div className = "t-flex t-justify-space-between t-md-10 m-h70">
                         <div className = "t-md-7 t-flex t-flex-column t-justify-left m-small-pad t-align-baseline t-fullheight ">
                                   <span className = "t-gray-darken-4-f  t-h2 mid">{title}</span>
                                   <div className = "t-flex t-flex-row t-justify-space-between t-align-baseline t-md-10">
                                       <div className = "m-progress" style = {style} ></div><span className = "t-h1 mid t-orange-f Lato t-postmid" >{percentage} %
                                       </span> </div>
                               </div>
                                <div className = "t-md-3 t-flex t-justify-center t-align-center">
                                       <div className = "m-round-btn2 t-flex t-justify-center t-align-center ">
                                           
                                           </div>       </div>
                           </div>
                            <div className = "t-flex t-justify-space-around t-align-center t-md-10 m-h30">
                                     <div className = "t-flex t-flex-row t-justify-space-around t-md-5 t-fullheight">
                                        <div className = "m-white-btn"><i className = "fa fa-folder-open" ></i>&nbsp;Create New</div>
                                        <div className = "m-white-btn"> <i className = "fa fa-pencil"></i>&nbsp;Edit</div>
                                         </div>

                            </div>
                       </div>
                   
                   <div className = "m-card-bottom t-white">
                         <div className = "t-flex t-justify-center t-align-center  t-flex-column t-md-10 m-fullheight">
                                <div className = "m-round-btn22  m-top-sm m-scale-2 t-flex t-justify-center t-gray-lighten-2  t-gray-darken-1-f  t-align-center ">
                                          <i className = "large material-icons">{icon}</i>
                                        </div>                                       
                                <div className = "t-h2 t-center-f t-justify-center m-top-sm thin t-md-8">{title} </div> 
                                <div className = "t-h3 t-center-f t-justify-center thin t-md-6   t-gray-lighten-1-f">{subtitle} </div>                                   
                         </div>
                   </div>                   
                   </div>

        );
    }
}
function matchStateToProps(state){
    return {    
        results:state.results
    }
}

TenantCard.propTypes = {
   // auth: PropTypes.object.isRequired,
    // attribute: PropTypes.string.isRequired,
     results: PropTypes.object.isRequired,
     title: PropTypes.string.isRequired,
     //subtitle: PropTypes.string.isRequired,


}
export default connect(matchStateToProps)(TenantCard)