import React, {Component} from 'react';
import Form from './login/Form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../../state/actions/authAction';
import {Helmet} from "react-helmet";

class Login extends Component {

    typingTimerId;

    constructor(props){
        super(props);
        this.state = {
            current_text: '',
            temp: 'everything is in one place.',
            first_text: 'everything is in one place.',
            second_text: 'everything is on Rent Right.'
        }
    }

    componentDidMount(){
        this.typingLoop('type');
    }

    typeChar(char){
        const text = this.state.current_text;
        this.setState({current_text: text+char});
    }

    erase(){
        const str = this.state.current_text;
        this.setState({current_state: ''});
    }

    typingLoop(action){
        const {temp,current_text} = this.state;

        if(action === 'type'){
            let inc = 0;

            this.typingTimerId = setInterval(()=>{
                let strChar = temp.charAt(inc++).toLowerCase()
                this.typeChar(strChar);
                if(inc >= temp.length){
                    clearInterval(this.typingTimerId);
                    this.typingLoop('erase')
                }
            },200);
        }else{
            let inc = current_text.length - 1;

            this.typingTimerId = setInterval(()=>{
                this.erase(inc--);
                if(inc <= 0){
                    clearInterval(this.typingTimerId);
                }
            },200);
        }

    }

    render() {
        return (
            <div id="login-page">
                <Helmet>
                    <link href="http://localhost:3000/CSS/auth.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <div id="login-top">
                    <div id="login-card">
                        <div id="login-form">
                            <div id="logo">
                                <img className="center" src="http://localhost:3000/images/rentright-logo-100.png"/>
                            </div>
                            <div className="center-text">
                                <h3>Sign In</h3>
                            </div>
                            <div>
                                <div className="input-field">
                                    <i className="fa fa-user"/>
                                    <input type="text" placeholder="email"/>
                                </div>
                                <div className="underline"/>
                                <div className="input-field">
                                    <i className="fa fa-lock"/>
                                    <input type="password" placeholder="password"/>
                                </div>
                                <button className="submit-btn"> Login</button>
                                <div className="social-login center-text">
                                    Or sign in with your social account
                                    <div className="social-buttons">
                                        <span><a className="social-button btn-lg facebook"><i className="fa fa-facebook"/></a></span>
                                        <span><a className="social-button btn-lg twitter"><i className="fa fa-twitter"/></a></span>
                                        <span><a className="social-button btn-lg linkedin"><i className="fa fa-linkedin"/></a></span>
                                        <span><a className="social-button btn-lg google-plus"><i className="fa fa-google-plus"/></a></span>
                                    </div>
                                </div>

                                <div id="other-links">
                                    <ul className="others">
                                        <li>Create account</li>
                                        <li>Help</li>
                                        <li>About</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="login-wallpaper">
                            <div className="overlay">
                                <h1>Rent Done Right.</h1>
                                <div className="details"> Managing your rental property is easier when {this.state.current_text}<span className="cursor">...</span> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="login-bottom">

                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, {login})(Login)