/**
 * Created by Adisat on 15/11/2017.
 */
/**
 * Created by Adisat on 14/11/2017.
 */
/**
 * Created by Adisat on 13/11/2017.
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
            <div className="t-flex t-md-10  t-flex-column ">
                <div className="t-flex-column t-flex t-md-10 you-complete-me">
                                    <span className="t-flex you-deserve t-md-6 proxima">
                                       Amenities
                                    </span>
                    <span className="the-best t-flex t-md-9 proxima">
                                        Tenants will use this information to search properties.
                                    </span>
                </div>
                <div className="If t-flex t-flex-column ">
                            <span className="a-listing-header proxima "> Basic Amenities</span>
                            <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                                <div className="uncle-suruu t-flex t-md-10 t-flex-wrap t-justify-space-between ">
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="balcony"
                                                 label="Balcony"
                                                 checked={amenities.includes('balcony')}
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="storage"
                                                 label="Storage"
                                                 checked={amenities.includes('storage')}
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="patio"
                                                 label="Patio"
                                                 checked=""
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="garden"
                                                 label="Garden"
                                                 checked=""
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="deck"
                                                 label="Deck"
                                                 checked=""
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="water"
                                                 label="Water"
                                                 checked=""
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="balcony"
                                                 label="Balcony"
                                                 checked=""
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>
                            <div className="t-flex t-flex-column t-md-1">
                                <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                                 name="balcony"
                                                 label="Balcony"
                                                 checked=""
                                                 onCheck={this.onChange.bind(this)}/>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="If t-flex t-flex-column ">
                    <span className="a-listing-header proxima "> Additional Amenities</span>
                    <div className="uncle-suruu t-flex t-md-10 t-flex-wrap t-justify-space-around ">
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="hottub"
                                             label="Hot Tub"
                                             checked={this.props.checked}
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="hottub"
                                             label="Washing Matchine"
                                             checked={this.props.checked}
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Water Heater"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Gas Cooker"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Furniture"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Unlimited Internet"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Swimming Pool"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-2">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Gymnasium"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>
                        <div className="t-flex t-flex-column t-md-1">
                            <ImageCheckBox   src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                                             name="balcony"
                                             label="Backup Power"
                                             checked=""
                                             onCheck={this.props.onChange}/>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}