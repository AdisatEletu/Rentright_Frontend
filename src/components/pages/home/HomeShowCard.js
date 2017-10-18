import React, {Component} from 'react';
import {Icon} from "antd";
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {BindActionCreators} from 'redux';

class HomeShowCard extends Component{

    constructor(props){
        super(props);

        this.state = {
            unit: this.props.unit || {},
            index: 0,
        }
    }

    navImage(action){
        const unit_images = [...this.state.unit.unit_images];
        const image_count = unit_images.length;
        const index = this.state.index;



        switch (action){
            case 'next':
                if(index < image_count-1){
                    this.setState({index: index+1});
                }else{
                    this.setState({index:0});
                }
                break;
                
            case 'previous':
                if(index > 0){
                    this.setState({index: index-1});
                }else{
                    this.setState({index:image_count -1});
                }
                break;

            default: return;
        }
    }

    render(){
        const {unit} = this.state;
        console.log(unit.address.address.address);
        return(
            <div className="home-property1 t-flex t-md-48 t-flex-column">
                <div className="home-property-picture1 t-flex t-md-10" style = {unit.unit_images.length > 0 ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+unit.unit_images[this.state.index].id+ ")"}:undefined}>

                    <div className="home-new-property-cover t-md-10 t-fullheight">

                        <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column ">
                            <div className="t-flex t-flex-row">
                                <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> &#8358; {unit.monthly_rent.toLocaleString('en')}</span>
                                <span className="t-flex home-newest-property-fav t-md-7 t-justify-right t-align-center "><i className="material-icons ">favorite_border</i> </span>
                            </div>
                            <div className="t-flex t-justify-space-between e-a t-align-center t-fullheight  t-md-10">
                                <div className = "e-a-left " onClick = {()=>this.navImage('previous')}><Icon type = "left"/></div>
                                <div className = "home-button-preshow"><NavLink
                                    to = {
                                        this.props.auth.user.uuid ?
                                        "tenant/applications/"+
                                    this.props.auth.user.uuid+"/"+
                                    unit.address.address.address +"/"+
                                    unit.id+"/overview"


                                    :
                                    "/sign-in"
                                    }


                                        className="bbb">Explore</NavLink></div>
                                <div className = "e-a-right" onClick = {()=>this.navImage('next')}><Icon type = "right"/></div>
                            </div>
                            {  /* <div className="t-flex t-justify-center t-align-content-center  t-md-10">
                             <span className="home-street-view t-md-5 t-justify-center t-align-center"><Icon type="link"/> Street View</span>
                             </div>*/}

                            {/*<div className=" home-aplicants t-flex t-md-10  ">
                             <div className=" t-flex t-md-5 t-align-center  ">
                             <div className="t-flex home-aplicant-picture" style = {unit.unit_images[1] ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+unit.unit_images[1].id+ ")"}:undefined} ></div>
                             <span className="home-aplicant-name t-align-center t-flex ">{unit.unit_images[1] &&unit.unit_images[1].section ? unit.unit_images[1].section: null}</span>
                             </div>

                             </div>*/}


                        </div>
                    </div>
                </div>
                <div className="home-newest-location t-flex t-flex-column t-md-10  t-justify-space-around t-align-content-space-around">

                    <div className="home-new-property-address t-flex t-md-10  t-justify-space-between">
                        <div className="home-new-property-addre  t-justify-space-between t-flex t-md-6 ">
                            <i className="material-icons t-md-1">place</i><span className="t-flex t-md-89 "> {unit.address.address.address.replace(','," ")}</span>
                        </div>

                        <div className="street-view t-flex  t-justify-space-between t-md-29">
                            <i className="material-icons t-md-1">streetview</i> <span className="t-flex t-md-75 ">Street View</span>
                        </div>
                    </div>
                    <div className="new-props-hr t-md-10 t-flex"/>




                    <div className="home-unit-attributes t-flex t-md-10 t-justify-space-between proxima">

                        <div className="home-sizes t-md-7 t-flex t-justify-space-between t-align-content-space-between">
                                        <span className="home-sqf t-flex t-md-33 t-justify-space-between  ">
                                            {/*<i className="material-icons t-md-1">home</i>*/}<span className="t-md-8"> {unit.square_footage} Sqft</span>
                                        </span>
                            <span className="home-sqf t-flex t-md-33 t-justify-space-between  ">
                                             {/*<i className="material-icons t-md-1">hotel</i>*/}<span className="t-md-8"> {unit.bedrooms} Rooms</span>
                                        </span>
                            <span className="home-sqf t-flex t-md-33 t-justify-space-between ">
                                            {/*<i className="material-icons t-md-1">hot_tub</i>*/}<span className="t-md-8"> {unit.bathrooms} Bathroom</span>
                                        </span>

                        </div>
                        <div className="t-flex home-applicant-right  t-md-3 ">
                            {unit.applications.length>0?
                                <div className = "t-md-10 t-full-height t-flex ">
                                    <div className="t-flex home-no-of-applicant t-align-center montserrat">{unit.applications.length} Applicant</div>
                                </div>
                                :
                                null

                            }
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
function matchStateToProps(state){
    return {
        auth:state.user.auth
    }
}
export default connect(matchStateToProps, {}) (HomeShowCard);