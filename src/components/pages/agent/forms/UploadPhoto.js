/**
 * Created by Adisat on 15/11/2017.
 */
import React, {Component} from "react";
import {Icon, notification} from "antd"
import {NavLink} from "react-router-dom";
import ImageCheckBox from "../../account/landlord/properties/propertiesEditor/shared/ImageCheckBox";




export default class Amenities extends Component {
    constructor(props){

        super(props)

        this.state={
            check: false,
            amenities:['balcony','storage','water']
        };
        //this.onChange=this.onChange.bind(this);
        //this.checked=this.check.bind(this);


    }



    onChange(e){
        //this.setState({[e.target.name]: e.target.checked});
        const {amenities} = this.state;

        if(e.target.checked){
            amenities.push(e.target.name);
            this.setState({amenities});
        }else{
            const removedAmenity = amenities.filter(function(amenity){
                return amenity !== e.target.name
            });
            this.setState({amenities:removedAmenity});
        }
    }

    render() {

        const {amenities} = this.state;
        return (
            <div className="t-flex t-md-10   t-flex-column ">
                <div className="t-flex-column t-flex t-md-10 you-complete-me">
                                    <span className="t-flex you-deserve t-md-6 proxima">
                                       Upload Photo
                                    </span>
                    <span className="the-best t-flex t-md-9 proxima">
                                        A picture say a thousand words, upload clear and quality pictures of the property (exterior and interior).
                                    </span>
                </div>

                <div className="If t-flex t-flex-column ">
                    <span className="a-listing-header proxima "> Cover Photo</span>
                    <span className="the-best t-flex margh t-md-9 proxima">
                                        This should be very clear and attractive as it will be the first picture of the property prospective tenants will see
                                    </span>
                        <div className="uncle-suruu t-flex t-md-10 t-flex-wrap t-justify-space-between ">
                            <div className="t-flex agent-list-click t-md-3 t-justify-center t-align-center" >
                                <Icon type="cloud-upload " className="a-cloud-i"/><span className="a-add-photo t-center-f">Add Photos</span>

                            </div>

                    </div>
                </div>

                <div className="If t-flex t-flex-column ">
                    <span className="a-listing-header proxima "> Other Photos</span>
                    <span className="the-best t-flex margh t-md-9 proxima">
                                       This should contain all images of  the property exterior and interior views, including images of amenities.
                                    </span>
                    <div className="uncle-suruu t-flex t-md-10">

                        <div className="t-flex t-flex-column t-md-25 residence t-justify-center t-align-center t-align-content-center">
                            <Icon type="picture"/>
                             <span className="hello-bae t-flex t-flex-row t-md-8 t-justify-center t-align-center "><Icon type="plus"/> <span className="add-phot">Add Photo</span></span>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}