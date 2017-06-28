import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProfileForm extends Component{

    constructor(props){
        super(props);

        const {user} = props;
        this.state ={
            isLoading: false,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            about_me:user.about_me,
        };
    }

    submitCallback(){
        this.setState({isLoading: false});
    }


    onSubmit(e){
        e.preventDefault();
        this.setState({isLoading: true});
        this.props.update(this.state, this.submitCallback.bind(this));
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const {isLoading} = this.state;
        return(
            <div className="col-md-9 col-sm-9">
                <form onSubmit={this.onSubmit.bind(this)} id="form-account-profile" >
                    <Contact onChange={this.onChange.bind(this)} user={this.state}/>
                    <About onChange={this.onChange.bind(this)} user={this.state}/>
                    <div className="form-group clearfix">
                        <button disabled={isLoading} type="submit" className="btn btn-block pull-right btn-default" id="account-submit">{isLoading ? <i className="fa fa-spinner fa-spin"/> : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        );
    }
}

function Contact(props){
    const {onChange,user} = props;

    return <section id="contact">
        <h3>Contact</h3>
        <dl className="contact-fields">
            <dt><label htmlFor="form-account-first-name">First Name:</label></dt>
            <dd>
                <div className="form-group">
                    <input onChange={onChange} type="text" className="form-control" id="form-account-first-name" name="first_name" required value={user.first_name} />
                </div>{/* /.form-group */}
            </dd>
            <dt><label htmlFor="form-account-last-name">Last Name:</label></dt>
            <dd>
                <div className="form-group">
                    <input onChange={onChange} type="text" className="form-control" id="form-account-last-name" name="last_name" required value={user.last_name} />
                </div>{/* /.form-group */}
            </dd>
            <dt><label htmlFor="form-account-email">Email:</label></dt>
            <dd>
                <div className="form-group">
                    <input onChange={onChange} type="email" className="form-control" id="form-account-email" name="email" value={user.email} />
                </div>{/* /.form-group */}
            </dd>
            <dt><label htmlFor="form-account-phone">Phone:</label></dt>
            <dd>
                <div className="form-group">
                    <input onChange={onChange} type="text" className="form-control" id="form-account-phone" name="phone_number" value={user.phone_number} />
                </div>{/* /.form-group */}
            </dd>
        </dl>
    </section>;
}

function About(props){

    const {onChange,user} = props;
    return <section id="about-me">
        <h3>About Me</h3>
        <div className="form-group">
            <textarea onChange={onChange} className="form-control" id="form-contact-agent-message" rows={5} name="about_me" value={user.about_me} />
        </div>{/* /.form-group */}
    </section>;
}

ProfileForm.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
}