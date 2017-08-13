import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-materialize';

class LeaseContact extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div>
                <h2 className="fs-title">Lessor</h2>
                <h3 className="fs-subtitle">Your contact information and current home or business address is required.
                    This is used as the Lessor section on the lease.</h3><br/>

                <h2 className="fs-header">Your Contact Information</h2>
                <h3 className="fs-subtitle to-left">This is how the tenant will contact you when needed.</h3>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="first_name" name="first_name" type="text" className="validate"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="first_name" className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last_name" type="text" name="last_name" className="validate"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="last_name" className="active">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="email" className="active">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phone_number" type="text" name="phone_number" className="validate"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="phone_number" className="active">Phone Number</label>
                    </div>
                </div><br/>

                <h2 className="fs-header">Your Home or Business Address</h2>
                <h3 className="fs-subtitle to-left">This is where formal legal documents would be sent to, if needed.</h3>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="street_address" type="text" name="street_address" className="validate"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="street_address" className="active">Street Address</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="city" type="text" name="city" className="validate"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="city" className="active">City</label>
                    </div>
                </div>
                <div className="row">
                    <Input s={12} m={6} type='select' label="State" name={'state'} defaultValue='1' onChange={this.props.onChange}>
                        <option value='1'>Lagos</option>
                    </Input>
                    <Input s={12} m={6} type='select' label="Country" name={'country'} defaultValue='1' onChange={this.props.onChange}>
                        <option value='1'>Nigeria</option>
                    </Input>
                </div><br/>
            </div>
        );
    }

}

LeaseContact.propTypes = {
    contact: PropTypes.object,
    onChange: PropTypes.func,
}

export default LeaseContact;

