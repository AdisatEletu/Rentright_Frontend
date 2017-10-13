/**
 * Created by Adisat on 16/08/2017.
 */
import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types'
import {register} from '../../state/actions/authAction';
import {connect} from 'react-redux';
import Landing from './Landing';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
}

class Facebook extends Component {

    render() {
        return (
            <FacebookLogin
                appId=" 112618779343581"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="login-fb-button"
                icon="fa-facebook"
            />
        );
    }
}

export class SignupForm extends Component{

    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name:"",
            phone_number: "",
            email: "",
            password: "",
            isLoading: false,
        }
    }



    onSubmit(e) {
        e.preventDefault();

        console.log(this.props)
        this.setState({isLoading: true});

        this.props.register(this.state).then((res) => {
            console.log(res)
            this.context.router.history.push("/")

        }).catch(
            (err) => console.log(err),

        );


    }

    onChange(e) {
        if (e.target.name === "password_confirm") {

        }
        this.setState({[e.target.name]: e.target.value});

    }

    render(){

        const {isLoading} = this.state;

        return(

                            <form method="post" onSubmit={this.onSubmit.bind(this)} className="t-flex t-flex-column t-md-10 t-align-center t-justify-center">
                            <div className="t-flex login-form-holder t-md-6 t-flex-column">
                                <div className="t-flex login-email-div t-md-10 t-justify-space-between">
                                    <span><i className="fa fa-user-o t-md-2  login-user-icon" /></span>
                                    <input type="text"  placeholder="First Name" name="first_name" disabled={isLoading}  onChange={this.onChange.bind(this)} className="t-md-8 login-email-box" />
                                </div>
                                <div className="login-hr" />

                                <div className="t-flex login-email-div t-md-10 t-justify-space-between">
                                    <span><i className="fa fa-user-o t-md-2  login-user-icon" /></span>
                                    <input type="text"  placeholder="Last Name" name="last_name" disabled={isLoading}  onChange={this.onChange.bind(this)} className="t-md-8 login-email-box" />
                                </div>

                                <div className="login-hr" />
                                <div className="t-flex login-email-div t-md-10 t-justify-space-between t">
                                    <span><i className="fa fa-phone t-md-2 login-user-icon" /></span>
                                    <input type="text" placeholder="Phone Number" name="phone_number" className="t-md-8 login-email-box"  disabled={isLoading}  onChange={this.onChange.bind(this)}  />
                                </div>

                                <div className="login-hr" />
                                <div className="t-flex login-email-div t-md-10 t-justify-space-between t">
                                    <span><i className="fa fa-envelope t-md-2 login-user-icon" /></span>
                                    <input type="email" placeholder="Email" name="email" className="t-md-8 login-email-box" disabled={isLoading}  onChange={this.onChange.bind(this)}/>
                                </div>

                                <div className="login-hr" />
                                <div className="t-flex login-email-div t-md-10 t-justify-space-between t">
                                    <span><i className="fa fa-lock t-md-2 login-user-icon" /></span>
                                    <input type="password" placeholder="Password" name="password" className="t-md-8 login-email-box" disabled={isLoading}  onChange={this.onChange.bind(this)} />
                                </div>
                            </div>
                            <div className="login-social t-flex t-md-10 t-flex-column t-align-center">
                            <div className="t-flex t-md-3  t-justify-center t-align-content-left login-submit-button" onClick={this.onSubmit.bind(this)} type="submit">{isLoading ?
                                <i className="fa fa-spinner fa-spin"/>: "Create an Account"}</div>

                            <div className="login-alt t-flex t-align-center t-md-3 login-alt t-justify-space-between">
                                <div className="line-div t-flex t-md-3" /><span className="t-flex login-or t-justify-space-around"> OR</span><div className="line-div t-flex t-md-3" />
                                </div>

                                 <div className="t-flex t-md-4  t-align-content-left t-justify-space-around "><Facebook/></div>
                                 <div className="t-flex t-md-4 t-justify-center login-lk-button t-align-content-left"> Linked <span className="login-in t-center-f"> in </span></div>

                             </div>
                        </form>

        );
    }
}
 class Register extends Component{

        render() {
            const {register} = this.props;
            return(
        <div className="t-fullheight t-fullwidth">

            <div className="home-mainbody t-flex t-align-content-stretch t-fullwidth  t-flex-column">

                <div className="login-firstnav t-flex t-justify-space-between home-primary-color t-align-center nav-pad-left-right">
                    <div className=" t-flex  t-fullheight t-justify-right t-right-f home-firstnav-innerdiv-left">
                        <span> The Ultimate Insider to the RentRight </span>
                    </div>
                    <div className="home-firstnav-innerdiv-right t-flex t-justify-center t-flex-row t-center-f t-fullheight">
                        <span className="home-breadcrumbs"><i className="material-icons ">home</i><a href="/"> Home</a></span>
                        <span className="home-breadcrumbs login-active"><i className="material-icons ">person_add</i><a href="/Register" style={{color: '#ffffff'}}> Register</a></span>
                    </div>
                </div>
            </div>


            <Helmet>
                <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
            </Helmet>
            <div className="login-page-content-box t-flex t-md-10 t-fullheight t-justify-space-between  ">

                <div className="t-flex t-flex-column t-md-3 login-form t-justify-space-between t-align-center">
                    <div className="t-flex  login-logo t-justify-center t-md-2" />
                    <div className="t-flex login-header  t-flex-column t-md-8 t-justify-center home-primary-color-f t-center-f">
                        <div className="login-h1 t-center-f">Welcome to RentRight</div>
                        <div className="login-h2 t-center-f ">Already on RentRight? <span className="login-a">< a href="/sign-in">Sign In</a></span> </div>
                    </div>


                    <SignupForm register={register}/>

                </div>

                    <div className="t-flex t-flex-row t-md-7 login-image t-right-bx ">
                    <div className="t-flex login-cover t-md-10 t-align-center t-justify-center t-flex-column">
                    <div className="login-text ">Renting Made Easy</div>
                    <div className="login-text-log t-md-6 t-center-f">Log into RentRight to list, manage or rent an apartment.Log into Rentright to list, manage or rent an apartment.Log into Rentright to list, manage or rent an apartment.Log into Rentright to list, manage or rent an apartment. </div>
                    </div>
                    </div>

                    </div>
                    </div>

                    );
                }
                    }

SignupForm.propTypes = {
    register: PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired,
}

Register.propTypes ={
    register: PropTypes.func.isRequired,
}
export default connect(null,{register})(Register);