import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProfileForm extends Component {

    constructor(props) {
        super(props);

        const {user} = props;
        this.state = {
            isLoading: false,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            about_me: user.about_me,
        };
    }

    submitCallback() {
        this.setState({isLoading: false});
    }


    onSubmit(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        this.props.update(this.state, this.submitCallback.bind(this));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit.bind(this)} id="form-account-profile">
                <div className="row">
                    <div className="col m3 col-s3">
                        <img alt="user avatar" className="img-responsive circle"
                             src="http://localhost:3000/assets/img/agent-01.jpg"/>
                    </div>
                    <div className="col m9 col s9">
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input onChange={this.onChange.bind(this)} type="text" className="validate"
                                       id="form-account-first-name"
                                       name="first_name" required value={this.state.first_name}/>
                                <label htmlFor="form-account-first-name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input onChange={this.onChange.bind(this)} type="text" className="validate"
                                       id="form-account-last-name"
                                       name="last_name" required value={this.state.last_name}/>
                                <label htmlFor="form-account-last-name">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input onChange={this.onChange.bind(this)} type="email" className="validate"
                                       id="form-account-email"
                                       name="email" value={this.state.email}/>
                                <label htmlFor="form-account-email" data-error="wrong">Email</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">call</i>
                        <input onChange={this.onChange.bind(this)} type="text" className="validate"
                               id="form-account-phone"
                               name="phone_number" value={this.state.phone_number}/>
                        <label htmlFor="form-account-phone" data-error="wrong">Phone</label>
                    </div>
                    <div className="input-field col s6">
                        <i className="material-icons prefix">call</i>
                        <input  type="text" className="validate"
                               id="form-account-alternate-phone"
                               name="alternate_phone_number"/>
                        <label htmlFor="form-account-alternate-phone" data-error="wrong">Alternate Phone</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">recent_actors</i>
                        <textarea onChange={this.onChange.bind(this)} id="form-account-about" rows={5}
                                  name="about_me" value={this.state.about_me} className="materialize-textarea validate"
                                  defaultValue={""}/>
                        <label className="active" htmlFor="form-account-about">About me</label>
                    </div>
                </div>

                <div className="row">
                    <button disabled={isLoading} type="submit"
                            className="btn col s4 right waves-effect waves-light primary-color"
                            id="account-submit">{isLoading ?
                        <span><i className="fa fa-spinner fa-spin"/> Saving</span> : 'Save Changes'}</button>
                </div>
            </form>
        );
    }
}

function About(props) {

    const {onChange, user} = props;
    return <section id="about-me">
        <h3>About Me</h3>
        <div className="form-group">
            <textarea onChange={onChange} className="form-control" id="form-contact-agent-message" rows={5}
                      name="about_me" value={user.about_me}/>
        </div>
        {/* /.form-group */}
    </section>;
}

ProfileForm.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
}