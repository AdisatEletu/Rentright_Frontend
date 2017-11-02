import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class LeaseContact extends Component {

    constructor(props) {
        super(props);
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
                               value={this.props.user.first_name} readOnly={true}/>
                        <label htmlFor="first_name" className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last_name" type="text" name="last_name" className="validate"
                               value={this.props.user.last_name} readOnly={true}/>
                        <label htmlFor="last_name" className="active">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate"
                               value={this.props.user.email} readOnly={true}/>
                        <label htmlFor="email" className="active">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phone_number" type="text" name="phone_number" className="validate"
                               value={this.props.user.phone_number} readOnly={true}/>
                        <label htmlFor="phone_number" className="active">Phone Number</label>
                    </div>
                </div><br/>

                <h2 className="fs-header">Your Home or Business Address</h2>
                <h3 className="fs-subtitle to-left">This is where formal legal documents would be sent to, if needed.</h3>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="street_address" type="text" name="street_name" className="validate"
                               value={this.props.contact.street_name} onChange={this.props.onChange}/>
                        <label htmlFor="street_address" className="active">Street Address</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="city" type="text" name="community"
                               value={this.props.contact.community} onChange={this.props.onChange}/>
                        <label htmlFor="city" className="active">City</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                    <select id={'state'} name={'state'} value={this.props.contact.state} onChange={this.props.onChange}>
                        <option value=''>Select State</option>
                        <option value='lagos'>Lagos</option>
                        <option value='abuja'>Abuja</option>
                        <option value='portharcourt'>Portharcourt</option>
                    </select>
                        <label className={'active'} htmlFor={'state'}>State</label>
                    </div>

                    <div className="input-field col s12 m6">
                    <select id={'country'} name={'country'} value={this.props.contact.country} onChange={this.props.onChange}>
                        <option value=''>Select Country</option>
                        <option value='Nigeria'>Nigeria</option>
                    </select>

                        <label className={'active'} htmlFor={'country'}>Country</label>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        user: state.user.auth.user
    }
}

LeaseContact.propTypes = {
    user: PropTypes.object,
}

export default connect(mapStateToProps) (LeaseContact);

