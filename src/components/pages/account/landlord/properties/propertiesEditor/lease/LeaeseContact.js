import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
                               value={this.props.user.first_name} onChange={this.props.onChange}/>
                        <label htmlFor="first_name" className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last_name" type="text" name="last_name" className="validate"
                               value={this.props.user.last_name} onChange={this.props.onChange}/>
                        <label htmlFor="last_name" className="active">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate"
                               value={this.props.user.email} onChange={this.props.onChange}/>
                        <label htmlFor="email" className="active">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phone_number" type="text" name="phone_number" className="validate"
                               value={this.props.user.phone_number} onChange={this.props.onChange}/>
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
                        <input id="city" type="text" name="city"
                               value={""} onChange={this.props.onChange}/>
                        <label htmlFor="city" className="active">City</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                    <select id={'state'} name={'state'} defaultValue='lagos' onChange={this.props.onChange}>
                        <option value='lagos'>Lagos</option>
                    </select>
                        <label className={'active'} htmlFor={'state'}>State</label>
                    </div>

                    <div className="input-field col s12 m6">
                    <select id={'country'} name={'country'} defaultValue='nigeria' onChange={this.props.onChange}>
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

