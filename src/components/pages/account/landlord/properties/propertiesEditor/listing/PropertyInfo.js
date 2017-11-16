import React, {Component} from 'react';
import {Row, Input} from 'react-materialize'
import PropTypes from 'prop-types';

class PropertyInfo extends Component {

    render() {
        const {info} = this.props;
        return (
            <div>
                <h2 className="fs-title"><b>Are you ready to list your property?</b></h2>
                <h3 className="fs-subtitle">Lets get some basic details out of the way</h3><br/>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="How many bedrooms?" name="bedrooms" id="bedrooms" className="validate"
                               value={info.bedrooms} onChange={this.props.onChange}/>
                        <label htmlFor="bedrooms" className="active">How many bedrooms?</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="How many bathrooms?" name="bathrooms" id="bedrooms" className="validate"
                               value={info.bathrooms} onChange={this.props.onChange}/>
                        <label htmlFor="bathrooms" className="active">How many bathrooms?</label>
                    </div>
                </div>
                <div className={'row'}>
                    <div className="input-field col s12 m12">
                        <label className={'active'}>Whats type of property is this</label>
                        <select name={"unit_type"} className="browser-default"
                                value={info.unit_type} onChange={this.props.onChange}>
                            <option value="apartment">Apartment</option>
                            <option value="single_family">Single family house</option>
                            <option value="flat">Flat</option>
                            <option value="self_contained">Self contained</option>
                            <option value="office">Office Space</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Whats the square footage?" id="footage"
                               className="validate" name="square_footage" value={info.square_footage}
                               onChange={this.props.onChange}/>
                        <label htmlFor="footage" className="active">whats the square footage?</label>
                    </div>
                </div>
                <div>
                    <div className="input-field col s12">
                        <input placeholder="How many parking spaces?" name="parking_no" id="parking_no" className="validate"
                               value={info.parking_no} onChange={this.props.onChange}/>
                        <label htmlFor="parking_no" className="active">What no of parking does this property have?</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label><b>What are your policies</b></label>
                        <ul className="submit-features">
                            <li>
                                <div className="switch">
                                    <label>

                                        <input type="checkbox" name="smoking" checked={info.smoking}
                                               onChange={this.props.onChange}/>
                                        <span className="lever"/>
                                        Smoking not allowed.
                                    </label>
                                </div>
                            </li>
                            <li style={{marginTop: '10px'}}>
                                <div className="switch">
                                    <label>
                                        <input type="checkbox" name="pets" checked={info.pets}
                                               onChange={this.props.onChange}/>
                                        <span className="lever"/>
                                        Pets not allowed.
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

PropertyInfo.propTypes = {
    info: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}
export default PropertyInfo;

