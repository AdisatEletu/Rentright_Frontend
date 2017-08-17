import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ContactInfo extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div>
                <h2 className="fs-title">Contact Information</h2>
                <h3 className="fs-subtitle">How should prospects contact you?</h3><br/>

                <div className="alert alert-info" style={{marginBottom: '20px'}}>
                    <div className="row" style={{padding: '0px', margin: '0px'}}>
                        <div className="col m1">
                            <i className="fa fa-info-circle fa-2x primary-color-text"/>
                        </div>
                        <div className="col m11" style={{paddingTop: '5px'}}>
                            Changes made here will affect your account.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="first_name" name="first_name" type="text" className="validate"
                               value={this.props.contact.first_name} onChange={this.props.onChange}/>
                        <label htmlFor="first_name" className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last_name" type="text" name="last_name" className="validate"
                               value={this.props.contact.last_name} onChange={this.props.onChange}/>
                        <label htmlFor="last_name" className="active">Last Name</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate"
                               value={this.props.contact.email} onChange={this.props.onChange}/>
                        <label htmlFor="email" className="active">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phone_number" type="text" name="phone_number" className="validate"
                               value={this.props.contact.phone_number} onChange={this.props.onChange}/>
                        <label htmlFor="phone_number" className="active">Phone Number</label>
                    </div>
                </div>

            </div>
        );
    }

}

ContactInfo.propTypes = {
    contact: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ContactInfo;

