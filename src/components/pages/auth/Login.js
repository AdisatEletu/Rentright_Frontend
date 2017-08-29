import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../../state/actions/authAction';
import {Helmet} from "react-helmet";
import LoadingBar from 'react-redux-loading-bar';

class Login extends Component {

    typingTimerId;

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            current_text: '',
            temp: 'everything is on Rent Right.',
            first_text: 'everything is in one place.',
            second_text: 'everything is on Rent Right.'
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleLogin = () =>{
        this.setState({loading: true});
        const {email,password} = this.state;
        this.props.login({email,password},this.loginCallback.bind(this));
    }

    loginCallback = (status) => {
        this.setState({loading: false});
        if(status){
            this.context.router.history.replace('/account');
        }
    }

    componentDidMount(){
        this.typingLoop('type',200);
    }

    typeChar(char){
        const text = this.state.current_text;
        this.setState({current_text: text+char});
    }

    erase(end){
        const str = this.state.current_text.slice(0,end);
        this.setState({current_text: str});
    }

    typingLoop(action,interval){
        const {temp,current_text} = this.state;

        if(action === 'type'){
            let inc = 0;

            this.typingTimerId = setInterval(()=>{
                let strChar = temp.charAt(inc);
                this.typeChar(strChar);
                inc++;
                if(inc >= temp.length){
                    clearInterval(this.typingTimerId);
                    setTimeout(() => {
                        this.typingLoop('erase',100);
                    },2000);
                }
            },interval);
        }else{
            let inc = current_text.length - 1;
            this.typingTimerId = setInterval(()=>{
                this.erase(inc--);
                if(inc < 0){
                    clearInterval(this.typingTimerId);
                    const {first_text,second_text} = this.state;
                    this.setState({temp:first_text, first_text:second_text, second_text:first_text});
                    setTimeout(()=>{
                        this.typingLoop('type',200)
                    },2000);
                }
            },interval);
        }

    }

    componentWillUnmount(){
        clearInterval(this.typingTimerId);
    }

    render() {
        return (
            <div id="login-page">
                <LoadingBar style={{ background: 'linear-gradient(to bottom right, red, yellow)', height: '4px'}}/>
                <Helmet>
                    <link href="http://localhost:3000/CSS/auth.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <div id="login-top">
                    <div className="top-bar">
                        <span style={{marginLeft: '20px'}}><a href="/"><i style={{color:'#ffffff'}} className="fa fa-times fa-3x"/></a></span>
                    </div>
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
                                    <input onChange={this.onChange.bind(this)} disabled={this.state.loading} name="email" type="text" placeholder="email"/>
                                </div>
                                <div className="underline"/>
                                <div className="input-field">
                                    <i className="fa fa-lock"/>
                                    <input onChange={this.onChange.bind(this)} disabled={this.state.loading} name="password" type="password" placeholder="password"/>
                                </div>
                                <button onClick={this.handleLogin.bind(this)} className="submit-btn" disabled={this.state.loading}> {this.state.loading ? 'Logging in...': 'Login'}</button>
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
                                    <div className="table">
                                        <ul className="others">
                                            <li><a href="/register">Create Account</a></li>
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/Help">Help</a></li>
                                        </ul>
                                    </div>

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
                <div id="login-bottom"/>
                <div id="footer">
                    <div className="table">
                        <ul className="top-list">
                            <li>Help</li>
                            <li>About Us</li>
                            <li>Customer Service</li>
                        </ul>
                    </div>
                    < div className="table" style = {{marginTop: '10px', marginBottom: '20px'}}>
                    <i className="fa fa-copyright"/> Copyright Rent Right 2017.
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func,
}

Login.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default connect(null, {login})(Login)