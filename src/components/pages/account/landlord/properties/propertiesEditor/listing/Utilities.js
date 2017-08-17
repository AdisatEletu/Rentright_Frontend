import React, {Component} from 'react';
import ImageCheckBox from "../shared/ImageCheckBox";

class Utilities extends Component {

    render() {
        return (
            <div>
                <h2 className="fs-title">What Services are included?</h2>
                <h3 className="fs-subtitle">Select all that apply to your property.</h3><br/>

                <div className="row">
                    <div className="col s2"/>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="security"
                            label="Security"
                            checked={this.props.utilities.includes("security")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="power_supply"
                            label="Power Supply"
                            checked={this.props.utilities.includes("power_supply")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="sanitation"
                            label="Sanitation"
                            checked={this.props.utilities.includes("sanitation")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="water"
                            label="Water"
                            checked={this.props.utilities.includes("water")}
                            onCheck={this.props.onChange}/>
                    </div>
                    <div className="col s2"/>
                </div>

            </div>
        );
    }

}

export default Utilities;

