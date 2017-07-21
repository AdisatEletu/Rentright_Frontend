import React, {Component} from 'react';
import ImageCheckBox from "../shared/ImageCheckBox";

class Amenities extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    onCheck(e){
        this.setState({[e.target.name]: e.target.checked});
    }

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
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="deck"
                            label="Deck"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="den"
                            label="Den"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="dishwasher"
                            label="Dishwasher"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="patio"
                            label="Patio"
                            onCheck={this.onCheck.bind(this)}/>
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
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="ac"
                            label="A/C"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="furniture"
                            label="Furniture"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="cctv"
                            label="cctv"
                            checked={true}
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2"/>
                </div>
            </div>
        );
    }

}


export default Amenities;

