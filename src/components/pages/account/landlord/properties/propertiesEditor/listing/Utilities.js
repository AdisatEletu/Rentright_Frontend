import React, {Component} from 'react';
import ImageCheckBox from "../shared/ImageCheckBox";

class Utilities extends Component {

    onCheck(e){
        this.setState({[e.target.name]: e.target.checked});
    }

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
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="power_supply"
                            label="Power Supply"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="sanitation"
                            label="Sanitation"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2 center">
                        <ImageCheckBox
                            src="http://content.nike.com/content/dam/one-nike/globalAssets/menu_header_images/OneNike_Global_Nav_Icons_Running.png"
                            name="water"
                            label="Water"
                            onCheck={this.onCheck.bind(this)}/>
                    </div>
                    <div className="col s2"/>
                </div>

            </div>
        );
    }

}

export default Utilities;

