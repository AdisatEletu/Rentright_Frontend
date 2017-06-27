import React, {Component} from 'react';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PropTypes from 'prop-types'
import {register} from '../../../state/actions/authAction';
import {connect} from 'react-redux';

function BreadCrumbs() {
    return (
        <div className="container">
            <ol className="breadcrumb">
                <li><a href="#.com">Home</a></li>
                <li className="active">Register</li>
            </ol>
        </div>
    );
}

export class SignUp extends Component{
    render(){
        const {register} = this.props;
    return (
        <div className="container">
            <header><h1>Create Account</h1></header>
            <div className="row">
                <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                    <SignupForm register={register}/>
                    <hr/>
                    <div className="center">
                        <figure className="note">By clicking the “Create an Account” button you agree with our <a
                            href="terms-conditions.html">Terms and conditions</a></figure>
                    </div>
                </div>
            </div>
        </div>

    );
    }
}

export class SignupForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            isLoading: false,
        }
    }


    onSubmit(e) {
        e.preventDefault();
        this.setState({isLoading: true});

        this.props.register(this.state).then(
            (res) => console.log(res),
        ).catch(
            (err) => console.log(err),
        );
    }

    onChange(e) {
        if (e.target.name === "password_confirm") {

        }
        this.setState({[e.target.name]: e.target.value});

    }

    render() {
        const {isLoading} = this.state;
        return (
            <form id="form-create-account" method="post" onSubmit={this.onSubmit.bind(this)}>

                <div className="form-group">
                    <label htmlFor="form-create-account-first-name">First Name:</label>
                    <input disabled={isLoading} type="text" onChange={this.onChange.bind(this)} name="first_name"
                           className="form-control" id="form-create-account-first-name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="form-create-account-last-name">Last Name:</label>
                    <input disabled={isLoading} type="text" onChange={this.onChange.bind(this)} name="last_name"
                           className="form-control" id="form-create-account-last-name" required/>
                </div>
                {/* /.form-group */}
                <div className="form-group">
                    <label htmlFor="form-create-account-email">Email:</label>
                    <input disabled={isLoading} type="email" onChange={this.onChange.bind(this)} name="email"
                           className="form-control" id="form-create-account-email" required/>
                </div>
                {/* /.form-group */}
                <div className="form-group">
                    <label htmlFor="form-create-account-password">Password:</label>
                    <input disabled={isLoading} type="password" onChange={this.onChange.bind(this)} name="password"
                           className="form-control" id="form-create-account-password" required/>
                </div>
                {/* /.form-group */}
                <div className="form-group">
                    <label htmlFor="form-create-account-confirm-password">Confirm Password:</label>
                    <input disabled={isLoading} type="password" onChange={this.onChange.bind(this)}
                           name="password_confirm" className="form-control" id="form-create-account-confirm-password"
                           required/>
                </div>
                {/* /.form-group */}
                <div className="checkbox pull-left">
                    <label>
                        <input disabled={isLoading} type="checkbox" id="account-type-newsletter"
                               name="account-newsletter"/>Receive Newsletter
                    </label>
                </div>
                <div className="form-group clearfix">
                    <button disabled={isLoading} type="submit" className="btn pull-right btn-default"
                            id="account-submit">{isLoading ?
                        <i className="fa fa-spinner fa-spin"/> : "Create an Account"}</button>
                </div>
                {/* /.form-group */}
            </form>
        );
    }
}

class Register extends Component {

    render() {
        const {register} = this.props;
        
        return (
            <div className="page-sub-page page-create-account page-account" id="page-top" data-spy="scroll"
                 data-target=".navigation" data-offset={90}>
                <div className="wrapper">
                    <Header/>
                    <div className="page-content">
                        <BreadCrumbs/>
                        <SignUp register={register}/>
                        <br/>
                    </div>
                    <div id="overlay"/>
                    <Footer/>
                </div>
            </div>

        );
    }
}

SignupForm.propTypes = {
    register: PropTypes.func.isRequired,
}

SignUp.propTypes = {
    register: PropTypes.func.isRequired,
}

Register.propTypes ={
    register: PropTypes.func.isRequired,
}
export default connect(null, {register})(Register);