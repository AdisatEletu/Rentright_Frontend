import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ContactInfo extends Component {

    constructor(props){
        super(props);
        this.state = props.user;
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return (
            <div>
                <h2 className="fs-title">Contact Information</h2>
                <h3 className="fs-subtitle">How should prospects contact you?</h3><br/>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="first_name" name="first_name" type="text" className="validate" value={this.state.first_name} onChange={this.onChange.bind(this)} />
                        <label htmlFor="first_name" className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last_name" type="text" name="last_name" className="validate" value={this.state.last_name} onChange={this.onChange.bind(this)}/>
                        <label htmlFor="last_name" className="active">Last Name</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate" value={this.state.email} onChange={this.onChange.bind(this)} />
                        <label htmlFor="email" className="active">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phone_number" type="text" name="phone_number" className="validate" value={this.state.phone_number} onChange={this.onChange.bind(this)}/>
                        <label htmlFor="phone_number" className="active">Phone Number</label>
                    </div>
                </div>

            </div>
        );
    }

}

function mapStateToProps(state){

    return {
        user: state.user.auth.user,
    }
}

ContactInfo.propTypes = {
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(ContactInfo);

