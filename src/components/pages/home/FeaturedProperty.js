/**
 * Created by Adisat on 16/10/2017.
 */

import React, {Component} from 'react';
import {Icon, notification} from "antd";
import Wishlist from "../tenantlayouts/durables/layout_elements/wishlist";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


class FeaturedProperty extends Component {
    constructor(props){
        super(props);
        this.clicked=this.clicked.bind(this)
        this.state = {
            unit: this.props.unit || {},
            index: 0,
        }

    }



    clicked(context) {
       /* let message = ""
        if (context) {
            message = "You just liked a property, it has being added to your wishlist";
        } else {
            message = "You just unliked a property, it has being removed from your wishlist";
        }
        notification["success"]({
            message,
            description: "Your info has being updated"
        })
*/
    }

    navigate(action) {
        const unit_images = this.state.unit.unit_images;
        const image_count = unit_images.length;
        const index = this.state.index;

        switch (action) {
            case 'next':
                if (index < image_count - 1) {
                    this.setState({index: index + 1})
                }

                else {
                    this.setState({index: 0})
                }

                break;

            case 'prev':
                if (index > 0) {
                    this.setState({index: index - 1})
                }
                else {
                    this.setState({index: image_count - 1})
                }
                break;

            default:
                return;
        }

    }

    render(){
        const {unit} = this.state;

        return(
            <div className="t-flex t-flex-row t-md-10">
                <div className="t-flex  t-md-5 home-bgg g "  onClick ={()=>console.log('I was clicked')} style = {unit.unit_images.length > 0 ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+unit.unit_images[this.state.index].id+ ")"}:undefined}>
                    <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column t-align-content-space-between">
                        <div className="t-flex t-flex-row">
                            <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> &#8358; {unit.monthly_rent.toLocaleString('en')}</span>
                            <span className="t-flex home-newest-property-fav t-md-7 t-justify-right t-align-center ">
                                    {
                                        this.props.auth.user.uuid ?
                                            <Wishlist uuid = {this.props.auth.user.uuid}
                                                      clicked = {this.clicked}
                                                      unit_id = {unit.id}
                                            />
                                            :
                                            <NavLink to = "sign-in"><Icon type="heart-o"/></NavLink>

                                    }

                                </span>
                        </div>

                        <div className="t-flex t-justify-space-between e-a t-align-center t-fullheight  t-md-10">
                            <div className = "e-a-left " onClick = {()=>this.navigate('prev')}><Icon type = "left"/></div>
                            <div className = "e-a-right" onClick = {()=>this.navigate('next')}><Icon type = "right"/></div>
                        </div>


                    </div>
                </div>
                <div
                    className="home-ad-info t-flex t-fullheight t-md-5 t-flex t-align-space-between t-justify-space-between t-flex-column">
                    <div className="ad-info-address t-md-10"> {unit.address.address.address}
                    </div>
                    <div className="ad-proptype t-flex t-md-10">{unit.unit_type}</div>


                    <div className="t-flex ad-description1 t-flex-row t-md-10 t-justify-space-between ">
                        <div className="t-flex t-flex-column t-md-45">
                            <div className="t-flex  t-md-10 t-flex-column t-justify-left">
                                <span>4 bedrooms, {unit.bathrooms} baths</span>
                                <span> Home size: {unit.square_footage} Sq ft</span>
                                <span> Parking Spot: {unit.parking_no} </span>
                            </div>
                        </div>


                        <div className="ad-divider t-flex t-flex-column t-md-1 t-align-center ">

                        </div>


                        <div className="t-flex t-flex-column t-md-45">
                            <div className="t-flex  t-md-10 t-flex-column t-justify-left">
                                <span>Street view available</span>
                                { unit.applications.length>0?
                                    <div className="t-flex t-md-10 ">No of
                                        applicant: {unit.applications.length}</div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                      <div className="t-flex ad-view-offer t-flex-row t-md-10 t-justify-space-between ">

                            <NavLink
                                to = {
                                    this.props.auth.user.uuid ?
                                        "tenant/applications/"+
                                        this.props.auth.user.uuid+"/"+
                                        unit.address.address.address +"/"+
                                        unit.id+"/overview"


                                        :
                                        "/sign-in"
                                }


                                className="ad-view-offer-btn t-flex t-flex column t-md-45 t-align-center t-justify-space-between">

                                <span>View offer </span>
                                <i className="material-icons t-flex t-justify-right home-ad-icon ">arrow_forward</i></NavLink>

                        <div
                            className="ad-view-offer-btn2 t-flex t-flex column t-md-45 t-align-center t-justify-space-between">
                            <span> Street View </span><i className="material-icons t-justify-right home-ad-icon ">streetview</i>
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
    export default connect(matchStateToProps, {}) ( FeaturedProperty)
