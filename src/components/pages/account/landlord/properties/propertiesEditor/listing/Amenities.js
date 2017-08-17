import React, {Component} from 'react';
import ImageCheckBox from "../shared/ImageCheckBox";

class Amenities extends Component {

    render() {
        return (
            <div>
                <h2 className="fs-title">What Amenities are included?</h2>
                <h3 className="fs-subtitle">Select all that apply to your property.</h3><br/>
                <div className="row">
                    <div className="col s1 center">

                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="balcony"
                            label="Balcony"
                            checked={this.props.amenity.includes("balcony")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="deck"
                            label="Deck"
                            checked={this.props.amenity.includes("deck")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="den"
                            label="Den"
                            checked={this.props.amenity.includes("den")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="dish_washer"
                            label="Dishwasher"
                            checked={this.props.amenity.includes("dish_washer")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="patio"
                            label="Patio"
                            checked={this.props.amenity.includes("patio")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s1 center">

                    </div>
                </div><br/>
                <div className="row">
                    <div className="col s2"/>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="washing_machine"
                            label="Washing Machine"
                            checked={this.props.amenity.includes("washing_machine")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="ac"
                            label="A/C"
                            checked={this.props.amenity.includes("ac")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="furniture"
                            label="Furniture"
                            checked={this.props.amenity.includes("furniture")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="cctv"
                            label="cctv"
                            checked={this.props.amenity.includes("cctv")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2"/>
                </div>
            </div>
        );
    }

}


export default Amenities;

